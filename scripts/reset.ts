import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config.js'

const reset = async () => {
  console.log('🗑️  Iniciando reset de datos...\n')
  console.log('⚠️  ADVERTENCIA: Esto eliminará TODOS los datos de la base de datos.\n')

  const payload = await getPayload({ config })

  // Orden de eliminación (respetando dependencias)
  const collections = [
    'dishes',      // Primero los que tienen referencias
    'menus',
    'banners',
    'experiences',
    'spaces',
    'categories',  // Luego las categorías
    'allergens',   // Luego los alérgenos
    'media',       // Archivos
    'users',       // Usuarios al final
  ]

  for (const collection of collections) {
    try {
      console.log(`🗑️  Eliminando ${collection}...`)

      // Obtener todos los documentos
      const result = await payload.find({
        collection,
        limit: 1000,
      })

      if (result.docs.length === 0) {
        console.log(`   ⏭️  ${collection} ya está vacío`)
        continue
      }

      // Eliminar cada documento
      let deleted = 0
      for (const doc of result.docs) {
        try {
          await payload.delete({
            collection,
            id: doc.id,
          })
          deleted++
        } catch (error) {
          // Ignorar errores de eliminación individual
        }
      }

      console.log(`   ✅ ${deleted} documentos eliminados de ${collection}`)
    } catch (error) {
      console.log(`   ❌ Error eliminando ${collection}:`, error)
    }
  }

  // Resetear globals
  console.log('\n🔄 Reseteando globals...')

  try {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        title: '',
        description: '',
        contact: {},
        openingHours: [],
        socialMedia: {},
        copyright: '',
      },
    })
    console.log('   ✅ site-settings reseteado')
  } catch (error) {
    console.log('   ❌ Error reseteando site-settings')
  }

  try {
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        heroTitle: '',
        heroSubtitle: '',
        welcomeTitle: '',
        galeriaInicio: [],
        espaciosDestacados: [],
        experienciasDestacadas: [],
      },
    })
    console.log('   ✅ homepage reseteado')
  } catch (error) {
    console.log('   ❌ Error reseteando homepage')
  }

  console.log('\n' + '='.repeat(50))
  console.log('🎉 ¡Reset completado!')
  console.log('='.repeat(50))
  console.log('\n💡 Para volver a poblar los datos, ejecuta:')
  console.log('   npx tsx scripts/seed.ts\n')

  process.exit(0)
}

reset().catch((error) => {
  console.error('❌ Error en reset:', error)
  process.exit(1)
})
