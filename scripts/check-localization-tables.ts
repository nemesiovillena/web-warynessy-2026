import pg from 'pg'
const { Client } = pg

const connectionString = process.env.DATABASE_URL || 'postgresql://nemesioj@localhost:5432/warynessy'

async function main() {
    const client = new Client({ connectionString })
    await client.connect()

    console.log('🔍 Verificando tablas de localización...\n')

    const result = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name LIKE '%_locales%'
        ORDER BY table_name
    `)

    if (result.rows.length === 0) {
        console.log('❌ No se encontraron tablas de localización')
        console.log('   Payload debería haberlas creado automáticamente al iniciar')
    } else {
        console.log(`✅ Se encontraron ${result.rows.length} tablas de localización:\n`)
        result.rows.forEach(row => {
            console.log(`   - ${row.table_name}`)
        })
    }

    console.log('\n')

    // Verificar el enum type
    const enumResult = await client.query(`
        SELECT typname 
        FROM pg_type 
        WHERE typname = '_locales'
    `)

    if (enumResult.rows.length > 0) {
        console.log('✅ Enum type "_locales" creado')

        // Obtener los valores del enum
        const enumValues = await client.query(`
            SELECT enumlabel 
            FROM pg_enum 
            WHERE enumtypid = (
                SELECT oid FROM pg_type WHERE typname = '_locales'
            )
            ORDER BY enumsortorder
        `)

        console.log(`   Idiomas configurados: ${enumValues.rows.map(r => r.enumlabel).join(', ')}`)
    } else {
        console.log('❌ Enum type "_locales" no encontrado')
    }

    await client.end()
    process.exit(0)
}

main().catch((error) => {
    console.error('❌ Error:', error)
    process.exit(1)
})