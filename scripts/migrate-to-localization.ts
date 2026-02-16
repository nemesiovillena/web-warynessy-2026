import pg from 'pg'
const { Client } = pg

const connectionString = process.env.DATABASE_URL || 'postgresql://nemesioj@localhost:5432/warynessy'

async function main() {
    const client = new Client({ connectionString })

    try {
        await client.connect()
        console.log('🔗 Conectado a la base de datos\n')

        // Función para migrar una tabla
        async function migrateTable(tableName: string, columns: string[]) {
            console.log(`\n📝 Migrando ${tableName}...`)

            // Obtener todos los registros
            const { rows } = await client.query(`SELECT id, ${columns.join(', ')} FROM ${tableName}`)
            console.log(`   - ${rows.length} registros encontrados`)

            let migrated = 0
            for (const row of rows) {
                // Crear registro en español
                const values = columns.map(col => row[col])
                const placeholders = columns.map((_, i) => `$${i + 2}`).join(', ')

                try {
                    await client.query(
                        `INSERT INTO ${tableName}_locales (_parent_id, _locale, ${columns.join(', ')}) 
                         VALUES ($1, 'es', ${placeholders})`,
                        [row.id, ...values]
                    )

                    // Crear registros vacíos para otros idiomas
                    for (const locale of ['en', 'fr', 'de']) {
                        const emptyValues = columns.map(col => {
                            if (col === 'nombre' || col === 'titulo' || col === 'alt' || col === 'title' || col === 'etiqueta' || col === 'caracteristica' || col === 'item' || col === 'days' || col === 'hours' || col === 'copyright') {
                                return row[col] ? `${row[col]} (${locale})` : null
                            }
                            return row[col] || null
                        })

                        await client.query(
                            `INSERT INTO ${tableName}_locales (_parent_id, _locale, ${columns.join(', ')}) 
                             VALUES ($1, '${locale}', ${placeholders})`,
                            [row.id, ...emptyValues]
                        )
                    }

                    migrated++
                } catch (error: any) {
                    console.error(`   ⚠️  Error migrando registro ${row.id}: ${error.message}`)
                }
            }

            console.log(`   ✅ ${migrated} registros migrados`)
        }

        // Migrar alergenos
        await migrateTable('alergenos', ['nombre', 'descripcion'])

        // Migrar banners
        await migrateTable('banners', ['titulo', 'texto', 'link_texto'])

        // Migrar categorias
        await migrateTable('categorias', ['nombre', 'descripcion'])

        // Migrar espacios
        await migrateTable('espacios', ['nombre', 'descripcion'])

        // Migrar experiencias
        await migrateTable('experiencias', ['titulo', 'descripcion', 'resumen', 'validez'])

        // Migrar menus
        await migrateTable('menus', ['nombre', 'etiqueta', 'descripcion_menu', 'fechas_dias', 'descripcion'])

        // Migrar menus_grupo
        await migrateTable('menus_grupo', ['nombre', 'descripcion'])

        // Migrar configuracion_sitio
        await migrateTable('configuracion_sitio', ['title', 'description', 'contact_address'])

        console.log('\n✅ Migración completada con éxito\n')

        await client.end()
        process.exit(0)
    } catch (error) {
        console.error('\n❌ Error:', error)
        await client.end()
        process.exit(1)
    }
}

main()