import {createClient} from '@sanity/client'

const client = createClient({
  projectId: '6hx8igb1',
  dataset: 'production',
  useCdn: false,
  token: 'skYIbUhX1K8aAfSbXIMZtRi1M9Fkj4ksQr3z9xymLao6hqFvx7JEUuDIUJJ8ya5538mazGoH2nzX8xWHwDXA3o4arX1LzKBbGOxzGw0dpX2PRBrN11AqO55LeRKbFKRcjH03ETx8unHHYNY486EWqJWXYOpfSH1SUXXOJlnYpe3ybcCOfj48',
  apiVersion: '2024-01-01',
})

const dishes = [
  {"_type":"dish","nombre":"Croquetas de Jamón Ibérico","slug":{"_type":"slug","current":"croquetas-jamon-iberico"},"descripcion":"Croquetas cremosas elaboradas con jamón ibérico de bellota. Ingredientes: Leche, harina, jamón ibérico, pan rallado, huevo","precio":12.5,"categoria":{"_type":"reference","_ref":"category-entrantes"},"alergenos":[{"_type":"reference","_ref":"allergen-gluten"},{"_type":"reference","_ref":"allergen-lacteos"},{"_type":"reference","_ref":"allergen-huevos"}],"activo":true,"orden":1},
  {"_type":"dish","nombre":"Gambas al Ajillo","slug":{"_type":"slug","current":"gambas-ajillo"},"descripcion":"Gambas frescas salteadas con ajo y guindilla. Ingredientes: Gambas, aceite de oliva, ajo, guindilla, perejil","precio":15.0,"categoria":{"_type":"reference","_ref":"category-entrantes"},"alergenos":[{"_type":"reference","_ref":"allergen-crustaceos"}],"activo":true,"orden":2},
  {"_type":"dish","nombre":"Patatas Bravas","slug":{"_type":"slug","current":"patatas-bravas"},"descripcion":"Patatas fritas crujientes con salsa brava picante. Ingredientes: Patatas, aceite de oliva, salsa brava (tomate, pimentón)","precio":8.0,"categoria":{"_type":"reference","_ref":"category-entrantes"},"alergenos":[],"activo":true,"orden":3},
  {"_type":"dish","nombre":"Ensalada Warynessy","slug":{"_type":"slug","current":"ensalada-warynessy"},"descripcion":"Mezcla de lechugas, tomate, cebolla, atún, huevo, espárragos. Ingredientes: Lechuga variada, tomate, cebolla, atún, huevo, espárragos, aceitunas","precio":11.0,"categoria":{"_type":"reference","_ref":"category-ensaladas"},"alergenos":[{"_type":"reference","_ref":"allergen-pescado"},{"_type":"reference","_ref":"allergen-huevos"}],"activo":true,"orden":1},
  {"_type":"dish","nombre":"Ensalada de Cabra","slug":{"_type":"slug","current":"ensalada-cabra"},"descripcion":"Mezcla de lechugas con queso de cabra gratinado y nueces. Ingredientes: Lechugas, queso de cabra, nueces, tomate cherry, vinagreta de miel","precio":12.5,"categoria":{"_type":"reference","_ref":"category-ensaladas"},"alergenos":[{"_type":"reference","_ref":"allergen-lacteos"},{"_type":"reference","_ref":"allergen-frutos-secos"}],"activo":true,"orden":2},
  {"_type":"dish","nombre":"Entrecot a la Brasa","slug":{"_type":"slug","current":"entrecot-brasa"},"descripcion":"Entrecot de ternera a la brasa con guarnición. Ingredientes: Entrecot de ternera (400g), sal, pimienta, guarnición de patatas","precio":24.0,"categoria":{"_type":"reference","_ref":"category-carnes"},"alergenos":[],"activo":true,"orden":1},
  {"_type":"dish","nombre":"Secreto Ibérico","slug":{"_type":"slug","current":"secreto-iberico"},"descripcion":"Secreto ibérico a la plancha con reducción de Pedro Ximénez. Ingredientes: Secreto ibérico, sal Maldon, reducción de Pedro Ximénez","precio":18.5,"categoria":{"_type":"reference","_ref":"category-carnes"},"alergenos":[{"_type":"reference","_ref":"allergen-sulfitos"}],"activo":true,"orden":2},
  {"_type":"dish","nombre":"Lubina a la Sal","slug":{"_type":"slug","current":"lubina-sal"},"descripcion":"Lubina fresca al horno en costra de sal (para 2 personas). Ingredientes: Lubina fresca, sal gorda, hierbas aromáticas","precio":38.0,"categoria":{"_type":"reference","_ref":"category-pescados"},"alergenos":[{"_type":"reference","_ref":"allergen-pescado"}],"activo":true,"orden":1},
  {"_type":"dish","nombre":"Pulpo a la Gallega","slug":{"_type":"slug","current":"pulpo-gallega"},"descripcion":"Pulpo cocido con patata, pimentón y aceite de oliva. Ingredientes: Pulpo, patata, pimentón dulce y picante, aceite de oliva virgen extra","precio":19.5,"categoria":{"_type":"reference","_ref":"category-pescados"},"alergenos":[{"_type":"reference","_ref":"allergen-moluscos"}],"activo":true,"orden":2},
  {"_type":"dish","nombre":"Paella de Marisco","slug":{"_type":"slug","current":"paella-marisco"},"descripcion":"Paella tradicional con marisco fresco (mínimo 2 personas). Ingredientes: Arroz, gambas, mejillones, calamares, rape, caldo de pescado, azafrán","precio":20.0,"categoria":{"_type":"reference","_ref":"category-arroces"},"alergenos":[{"_type":"reference","_ref":"allergen-crustaceos"},{"_type":"reference","_ref":"allergen-moluscos"},{"_type":"reference","_ref":"allergen-pescado"}],"activo":true,"orden":1},
  {"_type":"dish","nombre":"Arroz Negro","slug":{"_type":"slug","current":"arroz-negro"},"descripcion":"Arroz con tinta de calamar y alioli (mínimo 2 personas). Ingredientes: Arroz, calamar, tinta de calamar, caldo de pescado, alioli","precio":18.5,"categoria":{"_type":"reference","_ref":"category-arroces"},"alergenos":[{"_type":"reference","_ref":"allergen-moluscos"},{"_type":"reference","_ref":"allergen-pescado"},{"_type":"reference","_ref":"allergen-huevos"}],"activo":true,"orden":2},
  {"_type":"dish","nombre":"Tarta de Queso","slug":{"_type":"slug","current":"tarta-queso"},"descripcion":"Tarta de queso cremosa al estilo tradicional. Ingredientes: Queso crema, huevos, azúcar, base de galleta","precio":6.5,"categoria":{"_type":"reference","_ref":"category-postres"},"alergenos":[{"_type":"reference","_ref":"allergen-lacteos"},{"_type":"reference","_ref":"allergen-gluten"},{"_type":"reference","_ref":"allergen-huevos"}],"activo":true,"orden":1},
  {"_type":"dish","nombre":"Flan Casero","slug":{"_type":"slug","current":"flan-casero"},"descripcion":"Flan de huevo casero con caramelo. Ingredientes: Huevos, leche, azúcar, vainilla","precio":5.0,"categoria":{"_type":"reference","_ref":"category-postres"},"alergenos":[{"_type":"reference","_ref":"allergen-huevos"},{"_type":"reference","_ref":"allergen-lacteos"}],"activo":true,"orden":2},
  {"_type":"dish","nombre":"Coulant de Chocolate","slug":{"_type":"slug","current":"coulant-chocolate"},"descripcion":"Bizcocho de chocolate con corazón fundido, servido con helado. Ingredientes: Chocolate, huevos, mantequilla, harina, azúcar, helado de vainilla","precio":7.5,"categoria":{"_type":"reference","_ref":"category-postres"},"alergenos":[{"_type":"reference","_ref":"allergen-gluten"},{"_type":"reference","_ref":"allergen-huevos"},{"_type":"reference","_ref":"allergen-lacteos"}],"activo":true,"orden":3}
]

console.log('🍽️  Iniciando carga de platos...\n')

try {
  for (const dish of dishes) {
    const created = await client.create(dish)
    console.log(`✓ ${dish.nombre} (${dish.precio}€)`)
  }
  console.log(`\n✅ ${dishes.length} platos cargados exitosamente!`)
} catch (error) {
  console.error('❌ Error:', error.message)
  process.exit(1)
}
