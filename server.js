import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import next from 'next';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dev = process.env.NODE_ENV !== 'production';
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0'; // Importante para contenedores/Docker
/**
 * HOTFIX: Asegura que la columna experiencias_id existe en la tabla de bloqueo de documentos.
 * Payload 3 a veces falla al sincronizar relaciones de bloqueo en tablas existentes.
 */
async function runDatabaseHotfix() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.log('⚠️ No DATABASE_URL found, skipping DB hotfix');
        return;
    }
    const pool = new pg.Pool({ connectionString });
    try {
        console.log('🔍 Running Robust Database Hotfix...');
        // Lista de tablas posibles donde Payload guarda los bloqueos (a veces usa _ o __)
        const tablesToCheck = ['payload_locked_documents_rels', 'payload_locked_documents__rels'];
        for (const tableName of tablesToCheck) {
            // 1. Verificar si la tabla existe
            const tableExistsRes = await pool.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_name = $1
        );
      `, [tableName]);
            if (tableExistsRes.rows[0].exists) {
                console.log(`📋 Checking table: ${tableName}`);
                // 2. Verificar si la columna existe
                const checkColumnQuery = `
          SELECT column_name 
          FROM information_schema.columns 
          WHERE table_name = $1 
          AND column_name = 'experiencias_id';
        `;
                const res = await pool.query(checkColumnQuery, [tableName]);
                if (res.rowCount === 0) {
                    console.log(`➕ Column "experiencias_id" missing in "${tableName}". Adding it...`);
                    // Añadir la columna de forma segura
                    await pool.query(`ALTER TABLE "${tableName}" ADD COLUMN IF NOT EXISTS "experiencias_id" integer;`);
                    // Intentar añadir la FK
                    try {
                        // Primero borrar si existe para evitar errores de duplicado
                        await pool.query(`ALTER TABLE "${tableName}" DROP CONSTRAINT IF EXISTS "${tableName}_experiencias_id_fk";`);
                        await pool.query(`
              ALTER TABLE "${tableName}" 
              ADD CONSTRAINT "${tableName}_experiencias_id_fk" 
              FOREIGN KEY ("experiencias_id") REFERENCES "experiencias"("id") ON DELETE SET NULL;
            `);
                        console.log(`✅ Column and FK added to ${tableName}.`);
                    }
                    catch (fkError) {
                        console.warn(`⚠️ Added column to ${tableName} but failed to add FK:`, fkError.message);
                    }
                }
                else {
                    console.log(`✅ Table "${tableName}" already has "experiencias_id".`);
                }
            }
        }
    }
    catch (error) {
        console.error('❌ Robust Database Hotfix failed:', error.message);
    }
    finally {
        await pool.end();
    }
}
async function start() {
    await runDatabaseHotfix();
    const app = express();
    // Inicializar Next.js para Payload CMS
    const nextApp = next({ dev, dir: process.cwd() });
    await nextApp.prepare();
    const nextHandler = nextApp.getRequestHandler();
    // Servir archivos estáticos del cliente Astro
    app.use('/_astro', express.static(path.join(__dirname, 'dist/client/_astro')));
    app.use(express.static(path.join(__dirname, 'dist/client'), { index: false }));
    // Endpoint de salud para Dokploy
    app.get('/health', (req, res) => {
        res.status(200).send('OK - Unified Server is up');
    });
    // Rutas de Payload/Next.js (admin, api, _next)
    app.all(/^\/(admin|api|_next)($|\/.*)/, (req, res) => {
        return nextHandler(req, res);
    });
    try {
        // Importar handler de Astro SSR dinámicamente
        const entryPath = path.join(__dirname, 'dist/server/entry.mjs');
        console.log(`📦 Loading Astro handler from: ${entryPath}`);
        const { handler: astroHandler } = await import(entryPath);
        // Resto de rutas → Astro SSR
        app.use((req, res, next) => {
            astroHandler(req, res, next);
        });
    }
    catch (astroError) {
        console.error('⚠️ Failed to load Astro handler. Web frontend might be unavailable:', astroError.message);
        app.use((req, res) => {
            res.status(503).send('Servicio temporalmente no disponible (Astro Error)');
        });
    }
    const server = createServer(app);
    server.listen(PORT, HOST, () => {
        console.log('');
        console.log(`🚀 Servidor unificado corriendo en ${HOST}:${PORT}!`);
        console.log(`📊 Payload Admin: http://localhost:${PORT}/admin`);
        console.log(`🔌 Payload API: http://localhost:${PORT}/api`);
        console.log(`🌐 Astro Frontend: http://localhost:${PORT}/`);
        console.log('');
    });
}
start().catch((error) => {
    console.error('❌ Error starting server:', error);
    process.exit(1);
});
