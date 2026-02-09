import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import next from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

import pg from 'pg'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dev = process.env.NODE_ENV !== 'production'
const PORT = parseInt(process.env.PORT || '3000', 10)
const HOST = '0.0.0.0' // Importante para contenedores/Docker

/**
 * HOTFIX: Asegura que la columna experiencias_id existe en la tabla de bloqueo de documentos.
 * Payload 3 a veces falla al sincronizar relaciones de bloqueo en tablas existentes.
 */
async function runDatabaseHotfix() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    console.log('⚠️ No DATABASE_URL found, skipping DB hotfix')
    return
  }

  const pool = new pg.Pool({ connectionString })

  try {
    console.log('🔍 Running Robust Database Hotfix...')

    // ========================================
    // 1. Crear tabla menus_grupo si no existe
    // ========================================
    const menusGrupoExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'menus_grupo'
      );
    `)

    if (!menusGrupoExists.rows[0].exists) {
      console.log('➕ Creating menus_grupo table...')
      await pool.query(`
        CREATE TABLE "menus_grupo" (
          "id" serial PRIMARY KEY,
          "nombre" varchar NOT NULL,
          "descripcion" varchar,
          "imagen_portada_id" integer,
          "orden" numeric DEFAULT 0,
          "activo" boolean DEFAULT true,
          "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
          "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
        );
      `)
      console.log('✅ menus_grupo table created.')

      // Crear índices
      await pool.query(`CREATE INDEX IF NOT EXISTS "menus_grupo_imagen_portada_idx" ON "menus_grupo" USING btree ("imagen_portada_id");`)
      await pool.query(`CREATE INDEX IF NOT EXISTS "menus_grupo_orden_idx" ON "menus_grupo" USING btree ("orden");`)
      await pool.query(`CREATE INDEX IF NOT EXISTS "menus_grupo_created_at_idx" ON "menus_grupo" USING btree ("created_at");`)
      console.log('✅ menus_grupo indexes created.')
    }

    // Crear tabla de relación menus_grupo_rels si no existe
    const menusGrupoRelsExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'menus_grupo_rels'
      );
    `)

    if (!menusGrupoRelsExists.rows[0].exists) {
      console.log('➕ Creating menus_grupo_rels table...')
      await pool.query(`
        CREATE TABLE "menus_grupo_rels" (
          "id" serial PRIMARY KEY,
          "order" integer,
          "parent_id" integer NOT NULL,
          "path" varchar NOT NULL,
          "menus_id" integer
        );
      `)

      // Crear índices
      await pool.query(`CREATE INDEX IF NOT EXISTS "menus_grupo_rels_order_idx" ON "menus_grupo_rels" USING btree ("order");`)
      await pool.query(`CREATE INDEX IF NOT EXISTS "menus_grupo_rels_parent_idx" ON "menus_grupo_rels" USING btree ("parent_id");`)
      await pool.query(`CREATE INDEX IF NOT EXISTS "menus_grupo_rels_path_idx" ON "menus_grupo_rels" USING btree ("path");`)
      await pool.query(`CREATE INDEX IF NOT EXISTS "menus_grupo_rels_menus_id_idx" ON "menus_grupo_rels" USING btree ("menus_id");`)
      console.log('✅ menus_grupo_rels table and indexes created.')
    }

    // ========================================
    // 2. Fix relation columns in other tables
    // ========================================

    // Lista de pares [nombre_columna, referencia_tabla]
    const relationsToFix = [
      ['experiencias_id', 'experiencias'],
      ['menus_grupo_id', 'menus_grupo'],
    ]

    const tablesToCheck = [
      'payload_locked_documents_rels',
      'payload_locked_documents__rels',
      'pagina_inicio_rels',
    ]

    for (const tableName of tablesToCheck) {
      const tableExistsRes = await pool.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_name = $1
        );
      `, [tableName])

      if (tableExistsRes.rows[0].exists) {
        console.log(`📋 Checking table: ${tableName}`)

        for (const [colName, refTable] of relationsToFix) {
          const checkColumnQuery = `
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = $1 
            AND column_name = $2;
          `
          const res = await pool.query(checkColumnQuery, [tableName, colName])

          if (res.rowCount === 0) {
            console.log(`➕ Column "${colName}" missing in "${tableName}". Adding it...`)

            // Añadir la columna
            await pool.query(`ALTER TABLE "${tableName}" ADD COLUMN IF NOT EXISTS "${colName}" integer;`)

            // Intentar añadir la FK si la tabla de referencia existe
            try {
              const refTableExistsRes = await pool.query(`
                SELECT EXISTS (
                  SELECT FROM information_schema.tables 
                  WHERE table_name = $1
                );
              `, [refTable])

              if (refTableExistsRes.rows[0].exists) {
                await pool.query(`ALTER TABLE "${tableName}" DROP CONSTRAINT IF EXISTS "${tableName}_${colName}_fk";`)
                await pool.query(`
                  ALTER TABLE "${tableName}" 
                  ADD CONSTRAINT "${tableName}_${colName}_fk" 
                  FOREIGN KEY ("${colName}") REFERENCES "${refTable}"("id") ON DELETE SET NULL;
                `)
                console.log(`✅ FK added for ${colName} in ${tableName}.`)
              }
            } catch (fkError) {
              console.warn(`⚠️ Failed to add FK for ${colName} in ${tableName}:`, (fkError as Error).message)
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('❌ Robust Database Hotfix failed:', (error as Error).message)
  } finally {
    await pool.end()
  }
}

async function start() {
  await runDatabaseHotfix()

  const app = express()

  // Inicializar Next.js para Payload CMS
  const nextApp = next({ dev, dir: process.cwd() })
  try {
    await nextApp.prepare()
  } catch (err) {
    console.error('❌ Critical error during Next.js app.prepare():', err)
    process.exit(1)
  }
  const nextHandler = nextApp.getRequestHandler()

  // Servir archivos estáticos del cliente Astro
  app.use('/_astro', express.static(path.join(__dirname, 'dist/client/_astro')))
  app.use(express.static(path.join(__dirname, 'dist/client'), { index: false }))

  // Endpoint de salud para Dokploy
  app.get('/health', (req, res) => {
    res.status(200).send('OK - Unified Server is up')
  })

  // Rutas de Payload/Next.js (admin, api, _next)
  app.all(/^\/(admin|api|_next)($|\/.*)/, (req, res) => {
    return nextHandler(req, res)
  })

  try {
    // Importar handler de Astro SSR dinámicamente
    const entryPath = path.join(__dirname, 'dist/server/entry.mjs')
    console.log(`📦 Loading Astro handler from: ${entryPath}`)
    const { handler: astroHandler } = await import(entryPath)

    // Resto de rutas → Astro SSR
    app.use((req, res, next) => {
      astroHandler(req, res, next)
    })
  } catch (astroError) {
    console.error('⚠️ Failed to load Astro handler. Web frontend might be unavailable:', (astroError as Error).message)
    app.use((req, res) => {
      res.status(503).send('Servicio temporalmente no disponible (Astro Error)')
    })
  }

  const server = createServer(app)
  server.listen(PORT, HOST, () => {
    console.log('')
    console.log(`🚀 Servidor unificado corriendo en ${HOST}:${PORT}!`)
    console.log(`📊 Payload Admin: http://localhost:${PORT}/admin`)
    console.log(`🔌 Payload API: http://localhost:${PORT}/api`)
    console.log(`🌐 Astro Frontend: http://localhost:${PORT}/`)
    console.log('')
  })
}

start().catch((error) => {
  console.error('❌ Error starting server:', error)
  process.exit(1)
})
