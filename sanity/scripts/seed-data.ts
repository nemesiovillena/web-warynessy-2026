import {createClient} from '@sanity/client'

// Cliente de Sanity
const client = createClient({
  projectId: '6hx8igb1',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_STUDIO_API_TOKEN || '',
  apiVersion: '2024-01-01',
})

// Datos de Alérgenos
const allergens = [
  {
    _type: 'allergen',
    _id: 'allergen-gluten',
    name: 'Gluten',
    code: 'GLU',
    icon: '🌾',
    description: 'Contiene gluten (trigo, centeno, cebada, avena)',
  },
  {
    _type: 'allergen',
    _id: 'allergen-crustaceos',
    name: 'Crustáceos',
    code: 'CRU',
    icon: '🦐',
    description: 'Contiene crustáceos y productos derivados',
  },
  {
    _type: 'allergen',
    _id: 'allergen-huevos',
    name: 'Huevos',
    code: 'HUE',
    icon: '🥚',
    description: 'Contiene huevos y productos derivados',
  },
  {
    _type: 'allergen',
    _id: 'allergen-pescado',
    name: 'Pescado',
    code: 'PES',
    icon: '🐟',
    description: 'Contiene pescado y productos derivados',
  },
  {
    _type: 'allergen',
    _id: 'allergen-cacahuetes',
    name: 'Cacahuetes',
    code: 'CAC',
    icon: '🥜',
    description: 'Contiene cacahuetes y productos derivados',
  },
  {
    _type: 'allergen',
    _id: 'allergen-soja',
    name: 'Soja',
    code: 'SOJ',
    icon: '🫘',
    description: 'Contiene soja y productos derivados',
  },
  {
    _type: 'allergen',
    _id: 'allergen-lacteos',
    name: 'Lácteos',
    code: 'LAC',
    icon: '🥛',
    description: 'Contiene leche y productos lácteos',
  },
  {
    _type: 'allergen',
    _id: 'allergen-frutos-secos',
    name: 'Frutos Secos',
    code: 'FRU',
    icon: '🌰',
    description: 'Contiene frutos de cáscara (almendras, avellanas, nueces, etc.)',
  },
  {
    _type: 'allergen',
    _id: 'allergen-apio',
    name: 'Apio',
    code: 'API',
    icon: '🥬',
    description: 'Contiene apio y productos derivados',
  },
  {
    _type: 'allergen',
    _id: 'allergen-mostaza',
    name: 'Mostaza',
    code: 'MOS',
    icon: '🌭',
    description: 'Contiene mostaza y productos derivados',
  },
  {
    _type: 'allergen',
    _id: 'allergen-sesamo',
    name: 'Sésamo',
    code: 'SES',
    icon: '🫘',
    description: 'Contiene granos de sésamo y productos derivados',
  },
  {
    _type: 'allergen',
    _id: 'allergen-sulfitos',
    name: 'Sulfitos',
    code: 'SUL',
    icon: '🍷',
    description: 'Contiene sulfitos (conservantes)',
  },
  {
    _type: 'allergen',
    _id: 'allergen-moluscos',
    name: 'Moluscos',
    code: 'MOL',
    icon: '🦑',
    description: 'Contiene moluscos y productos derivados',
  },
  {
    _type: 'allergen',
    _id: 'allergen-altramuces',
    name: 'Altramuces',
    code: 'ALT',
    icon: '🫛',
    description: 'Contiene altramuces y productos derivados',
  },
]

// Categorías de Carta
const categories = [
  {
    _type: 'category',
    _id: 'category-entrantes',
    name: 'Entrantes',
    slug: {_type: 'slug', current: 'entrantes'},
    description: 'Entrantes y aperitivos para comenzar',
    order: 1,
    isActive: true,
  },
  {
    _type: 'category',
    _id: 'category-ensaladas',
    name: 'Ensaladas',
    slug: {_type: 'slug', current: 'ensaladas'},
    description: 'Ensaladas frescas y saludables',
    order: 2,
    isActive: true,
  },
  {
    _type: 'category',
    _id: 'category-carnes',
    name: 'Carnes',
    slug: {_type: 'slug', current: 'carnes'},
    description: 'Carnes a la brasa y especialidades',
    order: 3,
    isActive: true,
  },
  {
    _type: 'category',
    _id: 'category-pescados',
    name: 'Pescados y Mariscos',
    slug: {_type: 'slug', current: 'pescados-mariscos'},
    description: 'Pescados frescos y mariscos de temporada',
    order: 4,
    isActive: true,
  },
  {
    _type: 'category',
    _id: 'category-arroces',
    name: 'Arroces',
    slug: {_type: 'slug', current: 'arroces'},
    description: 'Arroces y paellas tradicionales',
    order: 5,
    isActive: true,
  },
  {
    _type: 'category',
    _id: 'category-postres',
    name: 'Postres',
    slug: {_type: 'slug', current: 'postres'},
    description: 'Postres caseros y dulces tradicionales',
    order: 6,
    isActive: true,
  },
]

// Platos de prueba
const dishes = [
  // Entrantes
  {
    _type: 'dish',
    name: 'Croquetas de Jamón Ibérico',
    slug: {_type: 'slug', current: 'croquetas-jamon-iberico'},
    description: 'Croquetas cremosas elaboradas con jamón ibérico de bellota',
    ingredients: 'Leche, harina, jamón ibérico, pan rallado, huevo',
    price: 12.5,
    category: {_type: 'reference', _ref: 'category-entrantes'},
    allergens: [
      {_type: 'reference', _ref: 'allergen-gluten'},
      {_type: 'reference', _ref: 'allergen-lacteos'},
      {_type: 'reference', _ref: 'allergen-huevos'},
    ],
    isAvailable: true,
    order: 1,
  },
  {
    _type: 'dish',
    name: 'Gambas al Ajillo',
    slug: {_type: 'slug', current: 'gambas-ajillo'},
    description: 'Gambas frescas salteadas con ajo y guindilla',
    ingredients: 'Gambas, aceite de oliva, ajo, guindilla, perejil',
    price: 15.0,
    category: {_type: 'reference', _ref: 'category-entrantes'},
    allergens: [{_type: 'reference', _ref: 'allergen-crustaceos'}],
    isAvailable: true,
    order: 2,
  },
  {
    _type: 'dish',
    name: 'Patatas Bravas',
    slug: {_type: 'slug', current: 'patatas-bravas'},
    description: 'Patatas fritas crujientes con salsa brava picante',
    ingredients: 'Patatas, aceite de oliva, salsa brava (tomate, pimentón)',
    price: 8.0,
    category: {_type: 'reference', _ref: 'category-entrantes'},
    allergens: [],
    isAvailable: true,
    order: 3,
  },

  // Ensaladas
  {
    _type: 'dish',
    name: 'Ensalada Warynessy',
    slug: {_type: 'slug', current: 'ensalada-warynessy'},
    description: 'Mezcla de lechugas, tomate, cebolla, atún, huevo, espárragos',
    ingredients: 'Lechuga variada, tomate, cebolla, atún, huevo, espárragos, aceitunas',
    price: 11.0,
    category: {_type: 'reference', _ref: 'category-ensaladas'},
    allergens: [
      {_type: 'reference', _ref: 'allergen-pescado'},
      {_type: 'reference', _ref: 'allergen-huevos'},
    ],
    isAvailable: true,
    order: 1,
  },
  {
    _type: 'dish',
    name: 'Ensalada de Cabra',
    slug: {_type: 'slug', current: 'ensalada-cabra'},
    description: 'Mezcla de lechugas con queso de cabra gratinado y nueces',
    ingredients: 'Lechugas, queso de cabra, nueces, tomate cherry, vinagreta de miel',
    price: 12.5,
    category: {_type: 'reference', _ref: 'category-ensaladas'},
    allergens: [
      {_type: 'reference', _ref: 'allergen-lacteos'},
      {_type: 'reference', _ref: 'allergen-frutos-secos'},
    ],
    isAvailable: true,
    order: 2,
  },

  // Carnes
  {
    _type: 'dish',
    name: 'Entrecot a la Brasa',
    slug: {_type: 'slug', current: 'entrecot-brasa'},
    description: 'Entrecot de ternera a la brasa con guarnición',
    ingredients: 'Entrecot de ternera (400g), sal, pimienta, guarnición de patatas',
    price: 24.0,
    category: {_type: 'reference', _ref: 'category-carnes'},
    allergens: [],
    isAvailable: true,
    order: 1,
  },
  {
    _type: 'dish',
    name: 'Secreto Ibérico',
    slug: {_type: 'slug', current: 'secreto-iberico'},
    description: 'Secreto ibérico a la plancha con reducción de Pedro Ximénez',
    ingredients: 'Secreto ibérico, sal Maldon, reducción de Pedro Ximénez',
    price: 18.5,
    category: {_type: 'reference', _ref: 'category-carnes'},
    allergens: [{_type: 'reference', _ref: 'allergen-sulfitos'}],
    isAvailable: true,
    order: 2,
  },

  // Pescados
  {
    _type: 'dish',
    name: 'Lubina a la Sal',
    slug: {_type: 'slug', current: 'lubina-sal'},
    description: 'Lubina fresca al horno en costra de sal (para 2 personas)',
    ingredients: 'Lubina fresca, sal gorda, hierbas aromáticas',
    price: 38.0,
    category: {_type: 'reference', _ref: 'category-pescados'},
    allergens: [{_type: 'reference', _ref: 'allergen-pescado'}],
    isAvailable: true,
    order: 1,
  },
  {
    _type: 'dish',
    name: 'Pulpo a la Gallega',
    slug: {_type: 'slug', current: 'pulpo-gallega'},
    description: 'Pulpo cocido con patata, pimentón y aceite de oliva',
    ingredients: 'Pulpo, patata, pimentón dulce y picante, aceite de oliva virgen extra',
    price: 19.5,
    category: {_type: 'reference', _ref: 'category-pescados'},
    allergens: [{_type: 'reference', _ref: 'allergen-moluscos'}],
    isAvailable: true,
    order: 2,
  },

  // Arroces
  {
    _type: 'dish',
    name: 'Paella de Marisco',
    slug: {_type: 'slug', current: 'paella-marisco'},
    description: 'Paella tradicional con marisco fresco (mínimo 2 personas)',
    ingredients: 'Arroz, gambas, mejillones, calamares, rape, caldo de pescado, azafrán',
    price: 20.0,
    category: {_type: 'reference', _ref: 'category-arroces'},
    allergens: [
      {_type: 'reference', _ref: 'allergen-crustaceos'},
      {_type: 'reference', _ref: 'allergen-moluscos'},
      {_type: 'reference', _ref: 'allergen-pescado'},
    ],
    isAvailable: true,
    order: 1,
  },
  {
    _type: 'dish',
    name: 'Arroz Negro',
    slug: {_type: 'slug', current: 'arroz-negro'},
    description: 'Arroz con tinta de calamar y alioli (mínimo 2 personas)',
    ingredients: 'Arroz, calamar, tinta de calamar, caldo de pescado, alioli',
    price: 18.5,
    category: {_type: 'reference', _ref: 'category-arroces'},
    allergens: [
      {_type: 'reference', _ref: 'allergen-moluscos'},
      {_type: 'reference', _ref: 'allergen-pescado'},
      {_type: 'reference', _ref: 'allergen-huevos'},
    ],
    isAvailable: true,
    order: 2,
  },

  // Postres
  {
    _type: 'dish',
    name: 'Tarta de Queso',
    slug: {_type: 'slug', current: 'tarta-queso'},
    description: 'Tarta de queso cremosa al estilo tradicional',
    ingredients: 'Queso crema, huevos, azúcar, base de galleta',
    price: 6.5,
    category: {_type: 'reference', _ref: 'category-postres'},
    allergens: [
      {_type: 'reference', _ref: 'allergen-lacteos'},
      {_type: 'reference', _ref: 'allergen-gluten'},
      {_type: 'reference', _ref: 'allergen-huevos'},
    ],
    isAvailable: true,
    order: 1,
  },
  {
    _type: 'dish',
    name: 'Flan Casero',
    slug: {_type: 'slug', current: 'flan-casero'},
    description: 'Flan de huevo casero con caramelo',
    ingredients: 'Huevos, leche, azúcar, vainilla',
    price: 5.0,
    category: {_type: 'reference', _ref: 'category-postres'},
    allergens: [
      {_type: 'reference', _ref: 'allergen-huevos'},
      {_type: 'reference', _ref: 'allergen-lacteos'},
    ],
    isAvailable: true,
    order: 2,
  },
  {
    _type: 'dish',
    name: 'Coulant de Chocolate',
    slug: {_type: 'slug', current: 'coulant-chocolate'},
    description: 'Bizcocho de chocolate con corazón fundido, servido con helado',
    ingredients: 'Chocolate, huevos, mantequilla, harina, azúcar, helado de vainilla',
    price: 7.5,
    category: {_type: 'reference', _ref: 'category-postres'},
    allergens: [
      {_type: 'reference', _ref: 'allergen-gluten'},
      {_type: 'reference', _ref: 'allergen-huevos'},
      {_type: 'reference', _ref: 'allergen-lacteos'},
    ],
    isAvailable: true,
    order: 3,
  },
]

async function seedData() {
  console.log('🌱 Iniciando carga de datos de prueba...\n')

  try {
    // 1. Cargar Alérgenos
    console.log('📦 Cargando alérgenos...')
    for (const allergen of allergens) {
      await client.createOrReplace(allergen)
      console.log(`  ✓ ${allergen.name}`)
    }
    console.log(`✅ ${allergens.length} alérgenos cargados\n`)

    // 2. Cargar Categorías
    console.log('📦 Cargando categorías...')
    for (const category of categories) {
      await client.createOrReplace(category)
      console.log(`  ✓ ${category.name}`)
    }
    console.log(`✅ ${categories.length} categorías cargadas\n`)

    // 3. Cargar Platos
    console.log('📦 Cargando platos...')
    for (const dish of dishes) {
      const created = await client.create(dish)
      console.log(`  ✓ ${dish.name}`)
    }
    console.log(`✅ ${dishes.length} platos cargados\n`)

    console.log('🎉 ¡Datos de prueba cargados exitosamente!')
  } catch (error) {
    console.error('❌ Error al cargar datos:', error)
    process.exit(1)
  }
}

// Ejecutar
seedData()
