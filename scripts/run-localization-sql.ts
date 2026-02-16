import pg from 'pg'
const { Client } = pg
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const connectionString = process.env.DATABASE_URL || 'postgresql://nemesioj@localhost:5432/warynessy'

async function main() {
    const client = new Client({ connectionString })

    try {
        await client.connect()
        console.log('🔗 Conectado a la base de datos\n')

        // Leer el archivo SQL
        const sqlPath = join(__dirname, 'create-localization-tables-existing.sql')
        const sql = readFileSync(sqlPath, 'utf-8')

        console.log('📝 Ejecutando script SQL...\n')

        // Ejecutar el SQL
        await client.query(sql)

        console.log('✅ Script SQL ejecutado correctamente\n')

        // Verificar tablas creadas
        const result = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name LIKE '%_locales%'
            ORDER BY table_name
        `)

        if (result.rows.length > 0) {
            console.log(`✅ Se crearon ${result.rows.length} tablas de localización:\n`)
            result.rows.forEach((row: { table_name: string }) => {
                console.log(`   - ${row.table_name}`)
            })
        } else {
            console.log('❌ No se crearon tablas de localización')
        }

        await client.end()
        process.exit(0)
    } catch (error) {
        console.error('❌ Error:', error)
        await client.end()
        process.exit(1)
    }
}

main()