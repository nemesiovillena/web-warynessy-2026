import pg from 'pg'
const { Client } = pg

const connectionString = process.env.DATABASE_URL || 'postgresql://nemesioj@localhost:5432/warynessy'

async function main() {
    const client = new Client({ connectionString })
    await client.connect()

    console.log('🔧 Eliminando tablas de localización existentes...')

    const tablesToDrop = [
        'alergenos_locales',
        'categorias_locales',
        'platos_etiquetas_locales',
        'platos_locales',
        'menus_locales',
        'espacios_caracteristicas_locales',
        'espacios_locales',
        'banners_locales',
        'paginas_locales',
        'experiencias_incluye_locales',
        'experiencias_locales',
        'menus_grupo_locales',
        'pagina_inicio_locales',
        'configuracion_sitio_opening_hours_locales',
        'configuracion_sitio_footer_logos_locales',
        'configuracion_sitio_locales',
    ]

    for (const table of tablesToDrop) {
        try {
            await client.query(`DROP TABLE IF EXISTS "${table}" CASCADE`)
            console.log(`✅ Dropped: ${table}`)
        } catch (error) {
            console.log(`⚠️  Could not drop ${table}:`, (error as Error).message)
        }
    }

    // Drop enum type too
    try {
        await client.query('DROP TYPE IF EXISTS "_locales"')
        console.log('✅ Dropped enum type: _locales')
    } catch (error) {
        console.log('⚠️  Could not drop _locales:', (error as Error).message)
    }

    console.log('✨ Tablas eliminadas. Payload las recreará al iniciar.')

    await client.end()
    process.exit(0)
}

main().catch((error) => {
    console.error('❌ Error:', error)
    process.exit(1)
})