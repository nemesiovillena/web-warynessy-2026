import {createClient} from '@sanity/client'

const client = createClient({
  projectId: '6hx8igb1',
  dataset: 'production',
  useCdn: false,
  token: 'skYIbUhX1K8aAfSbXIMZtRi1M9Fkj4ksQr3z9xymLao6hqFvx7JEUuDIUJJ8ya5538mazGoH2nzX8xWHwDXA3o4arX1LzKBbGOxzGw0dpX2PRBrN11AqO55LeRKbFKRcjH03ETx8unHHYNY486EWqJWXYOpfSH1SUXXOJlnYpe3ybcCOfj48',
  apiVersion: '2024-01-01',
})

console.log('🗑️  Limpiando datos incorrectos...\n')

try {
  // Eliminar todos los platos
  console.log('Eliminando platos...')
  const dishes = await client.fetch('*[_type == "dish"]')
  for (const dish of dishes) {
    await client.delete(dish._id)
  }
  console.log(`✓ ${dishes.length} platos eliminados`)

  // Eliminar todas las categorías
  console.log('Eliminando categorías...')
  const categories = await client.fetch('*[_type == "category"]')
  for (const category of categories) {
    await client.delete(category._id)
  }
  console.log(`✓ ${categories.length} categorías eliminadas`)

  // Eliminar todos los alérgenos
  console.log('Eliminando alérgenos...')
  const allergens = await client.fetch('*[_type == "allergen"]')
  for (const allergen of allergens) {
    await client.delete(allergen._id)
  }
  console.log(`✓ ${allergens.length} alérgenos eliminados`)

  console.log('\n✅ Limpieza completada exitosamente!')
} catch (error) {
  console.error('❌ Error:', error.message)
  process.exit(1)
}
