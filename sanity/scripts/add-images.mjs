import {createClient} from '@sanity/client'

const client = createClient({
  projectId: '6hx8igb1',
  dataset: 'production',
  useCdn: false,
  token: 'skYIbUhX1K8aAfSbXIMZtRi1M9Fkj4ksQr3z9xymLao6hqFvx7JEUuDIUJJ8ya5538mazGoH2nzX8xWHwDXA3o4arX1LzKBbGOxzGw0dpX2PRBrN11AqO55LeRKbFKRcjH03ETx8unHHYNY486EWqJWXYOpfSH1SUXXOJlnYpe3ybcCOfj48',
  apiVersion: '2024-01-01',
})

// Mapeo de slugs de platos a URLs de Unsplash específicas
const dishImages = {
  'croquetas-jamon-iberico': 'https://images.unsplash.com/photo-1583873287991-de7b5e4d8743?w=800&q=80',
  'gambas-ajillo': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
  'patatas-bravas': 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=800&q=80',
  'ensalada-warynessy': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
  'ensalada-cabra': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
  'entrecot-brasa': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
  'secreto-iberico': 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80',
  'lubina-sal': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80',
  'pulpo-gallega': 'https://images.unsplash.com/photo-1625944525533-473f1a3c0e3e?w=800&q=80',
  'paella-marisco': 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800&q=80',
  'arroz-negro': 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=800&q=80',
  'tarta-queso': 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=800&q=80',
  'flan-casero': 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=80',
  'coulant-chocolate': 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80',
}

console.log('🖼️  Añadiendo imágenes de Unsplash a los platos...\n')

async function uploadImageFromUrl(url, dishName) {
  try {
    // Descargar la imagen desde Unsplash
    const response = await fetch(url)
    const buffer = await response.arrayBuffer()

    // Subir la imagen a Sanity
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: `${dishName}.jpg`,
    })

    return asset
  } catch (error) {
    console.error(`  ❌ Error descargando imagen para ${dishName}:`, error.message)
    return null
  }
}

async function addImagesToDishes() {
  try {
    // Obtener todos los platos
    const dishes = await client.fetch('*[_type == "dish"]')
    console.log(`Encontrados ${dishes.length} platos\n`)

    for (const dish of dishes) {
      const slug = dish.slug?.current

      if (!slug || !dishImages[slug]) {
        console.log(`⚠️  No hay imagen para: ${dish.nombre}`)
        continue
      }

      // Si ya tiene imagen, saltar
      if (dish.imagen) {
        console.log(`✓ ${dish.nombre} ya tiene imagen`)
        continue
      }

      console.log(`📥 Descargando imagen para: ${dish.nombre}...`)

      // Subir imagen desde Unsplash
      const imageAsset = await uploadImageFromUrl(dishImages[slug], slug)

      if (imageAsset) {
        // Actualizar el plato con la referencia a la imagen
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

addImagesToDishes()
