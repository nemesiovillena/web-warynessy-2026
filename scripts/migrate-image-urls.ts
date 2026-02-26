/**
 * Script para migrar las URLs de imágenes existentes al CDN de Bunny
 * 
 * Este script actualiza todas las URLs en la tabla 'archivos' para apuntar al CDN
 * en lugar de ser servidas desde el servidor local.
 * 
 * PATRÓN DE MIGRACIÓN:
 * - URLs actuales: /api/archivos/file/nombre.webp
 * - URLs nuevas: https://warynessy.b-cdn.net/nombre.webp
 */

import { Pool } from 'pg'

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

async function migrateImageUrls() {
    console.log('🔍 Iniciando migración de URLs de imágenes...\n')

    try {
        // 1. Verificar cuántas imágenes hay
        const countResult = await pool.query('SELECT COUNT(*) as total FROM archivos')
        const totalImages = parseInt(countResult.rows[0].total)
        console.log(`📊 Total de imágenes en la base de datos: ${totalImages}\n`)

        // 2. Mostrar ejemplos de URLs actuales
        console.log('📝 Ejemplos de URLs actuales:')
        const sampleResult = await pool.query(
            'SELECT id, filename, url FROM archivos LIMIT 3'
        )

        sampleResult.rows.forEach(row => {
            console.log(`  - ID ${row.id}: ${row.filename}`)
            console.log(`    URL actual: ${row.url}`)
        })
        console.log('')

        // 3. Confirmación del usuario
        console.log('⚠️  ESTE SCRIPT MODIFICARÁ LA BASE DE DATOS ⚠️')
        console.log('\nCambios que se realizarán:')
        console.log('  - Tabla: archivos')
        console.log('  - Columnas: url, thumbnail_u_r_l')
        console.log('  - Patrón: Reemplazar "/api/archivos/file/" por "https://warynessy.b-cdn.net/"')
        console.log('\nEjemplo:')
        console.log('  DE: /api/archivos/file/IMG_3981-1.webp')
        console.log('  A:  https://warynessy.b-cdn.net/IMG_3981-1.webp')
        console.log('')

        // 4. Preguntar confirmación
        const readline = await import('readline')
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        })

        const answer = await new Promise<string>((resolve) => {
            rl.question('¿Deseas continuar con la migración? (sí/no): ', resolve)
        })
        rl.close()

        if (answer.toLowerCase() !== 'si' && answer.toLowerCase() !== 'sí' && answer.toLowerCase() !== 's') {
            console.log('\n❌ Migración cancelada por el usuario')
            process.exit(0)
        }

        console.log('\n🚀 Ejecutando migración...\n')

        // 5. Realizar la migración de URLs principales
        const updateUrlsResult = await pool.query(`
      UPDATE archivos
      SET url = REPLACE(url, '/api/archivos/file/', 'https://warynessy.b-cdn.net/')
      WHERE url LIKE '/api/archivos/file/%'
    `)

        console.log(`✅ Actualizadas ${updateUrlsResult.rowCount} URLs principales`)

        // 6. Realizar la migración de thumbnails
        const updateThumbnailsResult = await pool.query(`
      UPDATE archivos
      SET thumbnail_u_r_l = REPLACE(thumbnail_u_r_l, '/api/archivos/file/', 'https://warynessy.b-cdn.net/')
      WHERE thumbnail_u_r_l LIKE '/api/archivos/file/%'
    `)

        console.log(`✅ Actualizados ${updateThumbnailsResult.rowCount} thumbnails`)

        // 7. Migración de sizes_thumbnail_url
        const updateSizesThumbnailResult = await pool.query(`
      UPDATE archivos
      SET sizes_thumbnail_url = REPLACE(sizes_thumbnail_url, '/api/archivos/file/', 'https://warynessy.b-cdn.net/')
      WHERE sizes_thumbnail_url LIKE '/api/archivos/file/%'
    `)
        console.log(`✅ Actualizados ${updateSizesThumbnailResult.rowCount} sizes_thumbnail_url`)

        // 8. Migración de sizes_card_url
        const updateSizesCardResult = await pool.query(`
      UPDATE archivos
      SET sizes_card_url = REPLACE(sizes_card_url, '/api/archivos/file/', 'https://warynessy.b-cdn.net/')
      WHERE sizes_card_url LIKE '/api/archivos/file/%'
    `)
        console.log(`✅ Actualizados ${updateSizesCardResult.rowCount} sizes_card_url`)

        // 9. Migración de sizes_hero_url
        const updateSizesHeroResult = await pool.query(`
      UPDATE archivos
      SET sizes_hero_url = REPLACE(sizes_hero_url, '/api/archivos/file/', 'https://warynessy.b-cdn.net/')
      WHERE sizes_hero_url LIKE '/api/archivos/file/%'
    `)
        console.log(`✅ Actualizados ${updateSizesHeroResult.rowCount} sizes_hero_url\n`)

        // 7. Verificar los cambios
        console.log('📝 Verificando cambios (mostrando 3 ejemplos):')
        const verifyResult = await pool.query(
            'SELECT id, filename, url FROM archivos LIMIT 3'
        )

        verifyResult.rows.forEach(row => {
            console.log(`  - ID ${row.id}: ${row.filename}`)
            console.log(`    URL nueva: ${row.url}`)
        })
        console.log('')

        // 10. Verificar URLs que quedaron sin cambiar en todas las columnas
        const unchangedResult = await pool.query(`
      SELECT COUNT(*) as total FROM archivos
      WHERE url LIKE '/api/archivos/file/%'
         OR thumbnail_u_r_l LIKE '/api/archivos/file/%'
         OR sizes_thumbnail_url LIKE '/api/archivos/file/%'
         OR sizes_card_url LIKE '/api/archivos/file/%'
         OR sizes_hero_url LIKE '/api/archivos/file/%'
    `)
        const unchangedCount = parseInt(unchangedResult.rows[0].total)

        if (unchangedCount > 0) {
            console.log(`⚠️  Advertencia: ${unchangedCount} URLs quedaron sin cambiar`)
            console.log('Esto puede ser normal si algunas imágenes ya tenían URLs correctas')
        } else {
            console.log('✅ Todas las URLs han sido migradas correctamente')
        }

        console.log('\n🎉 Migración completada con éxito!')

    } catch (error) {
        console.error('\n❌ Error durante la migración:', error)
        process.exit(1)
    } finally {
        await pool.end()
    }
}

// Ejecutar el script
migrateImageUrls()