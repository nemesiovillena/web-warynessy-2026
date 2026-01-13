import {createClient} from '@sanity/client'

const client = createClient({
  projectId: '6hx8igb1',
  dataset: 'production',
  useCdn: false,
  token: 'skYIbUhX1K8aAfSbXIMZtRi1M9Fkj4ksQr3z9xymLao6hqFvx7JEUuDIUJJ8ya5538mazGoH2nzX8xWHwDXA3o4arX1LzKBbGOxzGw0dpX2PRBrN11AqO55LeRKbFKRcjH03ETx8unHHYNY486EWqJWXYOpfSH1SUXXOJlnYpe3ybcCOfj48',
  apiVersion: '2024-01-01',
})

const data = [
  {"_type":"allergen","_id":"allergen-gluten","nombre":"Gluten","codigo":"GLU","icono":"🌾","descripcion":"Contiene gluten (trigo, centeno, cebada, avena)","orden":1},
  {"_type":"allergen","_id":"allergen-crustaceos","nombre":"Crustáceos","codigo":"CRU","icono":"🦐","descripcion":"Contiene crustáceos y productos derivados","orden":2},
  {"_type":"allergen","_id":"allergen-huevos","nombre":"Huevos","codigo":"HUE","icono":"🥚","descripcion":"Contiene huevos y productos derivados","orden":3},
  {"_type":"allergen","_id":"allergen-pescado","nombre":"Pescado","codigo":"PES","icono":"🐟","descripcion":"Contiene pescado y productos derivados","orden":4},
  {"_type":"allergen","_id":"allergen-cacahuetes","nombre":"Cacahuetes","codigo":"CAC","icono":"🥜","descripcion":"Contiene cacahuetes y productos derivados","orden":5},
  {"_type":"allergen","_id":"allergen-soja","nombre":"Soja","codigo":"SOJ","icono":"🫘","descripcion":"Contiene soja y productos derivados","orden":6},
  {"_type":"allergen","_id":"allergen-lacteos","nombre":"Lácteos","codigo":"LAC","icono":"🥛","descripcion":"Contiene leche y productos lácteos","orden":7},
  {"_type":"allergen","_id":"allergen-frutos-secos","nombre":"Frutos Secos","codigo":"FRU","icono":"🌰","descripcion":"Contiene frutos de cáscara (almendras, avellanas, nueces, etc.)","orden":8},
  {"_type":"allergen","_id":"allergen-apio","nombre":"Apio","codigo":"API","icono":"🥬","descripcion":"Contiene apio y productos derivados","orden":9},
  {"_type":"allergen","_id":"allergen-mostaza","nombre":"Mostaza","codigo":"MOS","icono":"🌭","descripcion":"Contiene mostaza y productos derivados","orden":10},
  {"_type":"allergen","_id":"allergen-sesamo","nombre":"Sésamo","codigo":"SES","icono":"🫘","descripcion":"Contiene granos de sésamo y productos derivados","orden":11},
  {"_type":"allergen","_id":"allergen-sulfitos","nombre":"Sulfitos","codigo":"SUL","icono":"🍷","descripcion":"Contiene sulfitos (conservantes)","orden":12},
  {"_type":"allergen","_id":"allergen-moluscos","nombre":"Moluscos","codigo":"MOL","icono":"🦑","descripcion":"Contiene moluscos y productos derivados","orden":13},
  {"_type":"allergen","_id":"allergen-altramuces","nombre":"Altramuces","codigo":"ALT","icono":"🫛","descripcion":"Contiene altramuces y productos derivados","orden":14},
  {"_type":"category","_id":"category-entrantes","nombre":"Entrantes","slug":{"_type":"slug","current":"entrantes"},"descripcion":"Entrantes y aperitivos para comenzar","orden":1,"activa":true},
  {"_type":"category","_id":"category-ensaladas","nombre":"Ensaladas","slug":{"_type":"slug","current":"ensaladas"},"descripcion":"Ensaladas frescas y saludables","orden":2,"activa":true},
  {"_type":"category","_id":"category-carnes","nombre":"Carnes","slug":{"_type":"slug","current":"carnes"},"descripcion":"Carnes a la brasa y especialidades","orden":3,"activa":true},
  {"_type":"category","_id":"category-pescados","nombre":"Pescados y Mariscos","slug":{"_type":"slug","current":"pescados-mariscos"},"descripcion":"Pescados frescos y mariscos de temporada","orden":4,"activa":true},
  {"_type":"category","_id":"category-arroces","nombre":"Arroces","slug":{"_type":"slug","current":"arroces"},"descripcion":"Arroces y paellas tradicionales","orden":5,"activa":true},
  {"_type":"category","_id":"category-postres","nombre":"Postres","slug":{"_type":"slug","current":"postres"},"descripcion":"Postres caseros y dulces tradicionales","orden":6,"activa":true},
]

console.log('🌱 Iniciando carga de datos...\n')

try {
  for (const doc of data) {
    await client.createOrReplace(doc)
    console.log(`✓ ${doc.nombre || doc._id}`)
  }
  console.log(`\n✅ ${data.length} documentos cargados exitosamente!`)
} catch (error) {
  console.error('❌ Error:', error.message)
  process.exit(1)
}
