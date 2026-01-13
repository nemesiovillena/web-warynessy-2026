import {createClient} from '@sanity/client'

const client = createClient({
  projectId: '6hx8igb1',
  dataset: 'production',
  useCdn: false,
  token: 'skYIbUhX1K8aAfSbXIMZtRi1M9Fkj4ksQr3z9xymLao6hqFvx7JEUuDIUJJ8ya5538mazGoH2nzX8xWHwDXA3o4arX1LzKBbGOxzGw0dpX2PRBrN11AqO55LeRKbFKRcjH03ETx8unHHYNY486EWqJWXYOpfSH1SUXXOJlnYpe3ybcCOfj48',
  apiVersion: '2024-01-01',
})

// URLs alternativas para las imágenes que fallaron
const dishImages = {
  'croquetas-jamon-iberico': 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=800&q=80',
  'pulpo-gallega': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80',
}

console.log('🖼️  Corrigiendo imágenes faltantes...\n')

async function uploadImageFromUrl(url, dishName) {
  try {
    const response = await fetch(url)
    const buffer = await response.arrayBuffer()

    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: `${dishName}.jpg`,
    })

    return asset
  } catch (error) {
    console.error(`  ❌ Error descargando imagen para ${dishName}:`, error.message)
    return null
  }
}

async function fixMissingImages() {
  try {
    for (const [slug, imageUrl] of Object.entries(dishImages)) {
      // Buscar el plato por slug
      const dishes = await client.fetch('*[_type == "dish" && slug.current == $slug]', {slug})

      if (dishes.length === 0) {
        console.log(`⚠️  No se encontró plato con slug: ${slug}`)
        continue
      }

      const dish = dishes[0]

      // Si ya tiene imagen, saltar
      if (dish.imagen) {
        console.log(`✓ ${dish.nombre} ya tiene imagen`)
        continue
      }

      console.log(`📥 Descargando imagen para: ${dish.nombre}...`)

      const imageAsset = await uploadImageFromUrl(imageUrl, slug)

      if (imageAsset) {
        await client
          .patch(dish._id)
          .set({
            imagen: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageAsset._id,
              },
              alt: dish.nombre,
            },
          })
          .commit()

        console.log(`✓ ${dish.nombre} - imagen añadida`)
      }
    }

    console.log('\n✅ ¡Proceso completado!')
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

fixMissingImages()
