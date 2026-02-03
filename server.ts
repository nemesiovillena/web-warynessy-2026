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
    console.log('🔍 Running Database Hotfix...')

    // 1. Verificar si la columna existe en payload_locked_documents_rels
    const checkColumnQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'payload_locked_documents_rels' 
      AND column_name = 'experiencias_id';
    `
    const res = await pool.query(checkColumnQuery)

    if (res.rowCount === 0) {
      console.log('➕ Column "experiencias_id" missing in "payload_locked_documents_rels". Adding it...')

      // Añadir la columna (Payload 3 usa el tipo de ID por defecto, que aquí es number/integer)
      await pool.query('ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "experiencias_id" integer;')

      // Intentar añadir la FK (opcional pero recomendado)
      try {
        await pool.query(`
          ALTER TABLE "payload_locked_documents_rels" 
          ADD CONSTRAINT "payload_locked_documents_rels_experiencias_id_fk" 
          FOREIGN KEY ("experiencias_id") REFERENCES "experiencias"("id") ON DELETE SET NULL;
        `)
        console.log('✅ Column and FK added successfully.')
      } catch (fkError) {
        console.warn('⚠️ Added column but failed to add FK (maybe "experiencias" table not created yet):', (fkError as Error).message)
      }
    } else {
      console.log('✅ Database schema is up to date (column "experiencias_id" exists).')
    }
  } catch (error) {
    console.error('❌ Database Hotfix failed:', (error as Error).message)
    // No salimos del proceso porque Payload podría intentar arreglarlo él mismo con push:true
  } finally {
    await pool.end()
  }
}

async function start() {
  await runDatabaseHotfix()

  const app = express()

  // Inicializar Next.js para Payload CMS
  const nextApp = next({ dev, dir: process.cwd() })
  await nextApp.prepare()
  const nextHandler = nextApp.getRequestHandler()

  // Servir archivos estáticos del cliente Astro
  app.use('/_astro', express.static(path.join(__dirname, 'dist/client/_astro')))
  app.use(express.static(path.join(__dirname, 'dist/client'), { index: false }))

  // Rutas de Payload/Next.js (admin, api, _next)
  // Usamos regex para que coincida con el prefijo pero se mantenga la URL completa
  app.all(/^\/(admin|api|_next)($|\/.*)/, (req, res) => {
    return nextHandler(req, res)
  })

  // Importar handler de Astro SSR dinámicamente
  const { handler: astroHandler } = await import('./dist/server/entry.mjs')

  // Resto de rutas → Astro SSR
  app.use((req, res, next) => {
    astroHandler(req, res, next)
  })

  const server = createServer(app)
  server.listen(PORT, '0.0.0.0', () => {
    console.log('')
    console.log('🚀 Servidor unificado corriendo!')
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
