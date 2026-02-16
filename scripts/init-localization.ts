import payload from 'payload'
import { getPayload } from 'payload'

// Inicializar Payload para generar las tablas de localización
async function main() {
    console.log('🚀 Inicializando Payload para generar tablas de localización...\n')

    try {
        const payloadInstance = await getPayload({ config: require('../payload.config') })

        console.log('✅ Payload inicializado correctamente')
        console.log('✅ Tablas de localización deberían haber sido creadas\n')

        // Dar tiempo a que se creen las tablas
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Verificar tablas
        const pg = await import('pg')
        const { Client } = pg

        const connectionString = process.env.DATABASE_URL || 'postgresql://nemesioj@localhost:5432/warynessy'
        const client = new Client({ connectionString })
        await client.connect()

        const result = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name LIKE '%_locales%'
            ORDER BY table_name
        `)

        if (result.rows.length > 0) {
            console.log(`✅ Se crearon ${result.rows.length} tablas de localización:`)
            result.rows.forEach(row => {
                console.log(`   - ${row.table_name}`)
            })
        } else {
            console.log('❌ No se crearon tablas de localización')
        }

        await client.end()
        process.exit(0)
    } catch (error) {
        console.error('❌ Error:', error)
        process.exit(1)
    }
}

main()