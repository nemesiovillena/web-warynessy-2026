import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config.js'

const seed = async () => {
  console.log('🚀 Iniciando seed de datos...\n')

  const payload = await getPayload({ config })

  // 1. Crear usuario administrador
  console.log('👤 Creando usuario administrador...')
  try {
    const existingUser = await payload.find({
      collection: 'users',
      where: { email: { equals: 'admin@warynessy.com' } },
    })

    if (existingUser.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@warynessy.com',
          password: 'Admin123!',
          firstName: 'Admin',
          lastName: 'Warynessy',
          role: 'admin',
        },
      })
      console.log('   ✅ Usuario admin creado: admin@warynessy.com / Admin123!')
    } else {
      console.log('   ⏭️  Usuario admin ya existe')
    }
  } catch (error) {
    console.log('   ❌ Error creando usuario:', error)
  }

  // 2. Crear alérgenos
  console.log('\n🥜 Creando alérgenos...')
  const alergenos = [
    { nombre: 'Gluten', codigo: 'G', icono: '🌾', orden: 1 },
    { nombre: 'Crustáceos', codigo: 'C', icono: '🦐', orden: 2 },
    { nombre: 'Huevos', codigo: 'H', icono: '🥚', orden: 3 },
    { nombre: 'Pescado', codigo: 'P', icono: '🐟', orden: 4 },
    { nombre: 'Cacahuetes', codigo: 'Ca', icono: '🥜', orden: 5 },
    { nombre: 'Soja', codigo: 'S', icono: '🫘', orden: 6 },
    { nombre: 'Lácteos', codigo: 'L', icono: '🥛', orden: 7 },
    { nombre: 'Frutos secos', codigo: 'F', icono: '🌰', orden: 8 },
    { nombre: 'Apio', codigo: 'Ap', icono: '🥬', orden: 9 },
    { nombre: 'Mostaza', codigo: 'M', icono: '🟡', orden: 10 },
    { nombre: 'Sésamo', codigo: 'Se', icono: '⚪', orden: 11 },
    { nombre: 'Sulfitos', codigo: 'Su', icono: '🍷', orden: 12 },
    { nombre: 'Moluscos', codigo: 'Mo', icono: '🦪', orden: 13 },
    { nombre: 'Altramuces', codigo: 'Al', icono: '🫛', orden: 14 },
  ]

  for (const alergeno of alergenos) {
    try {
      const existing = await payload.find({
        collection: 'allergens',
        where: { codigo: { equals: alergeno.codigo } },
      })

      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'allergens',
          data: alergeno,
        })
        console.log(`   ✅ ${alergeno.nombre}`)
      } else {
        console.log(`   ⏭️  ${alergeno.nombre} ya existe`)
      }
    } catch (error) {
      console.log(`   ❌ Error creando ${alergeno.nombre}`)
    }
  }

  // 3. Crear categorías
  console.log('\n📂 Creando categorías...')
  const categorias = [
    { nombre: 'Entrantes', slug: 'entrantes', orden: 1, activa: true },
    { nombre: 'Carnes', slug: 'carnes', orden: 2, activa: true },
    { nombre: 'Pescados', slug: 'pescados', orden: 3, activa: true },
    { nombre: 'Arroces', slug: 'arroces', orden: 4, activa: true },
    { nombre: 'Postres', slug: 'postres', orden: 5, activa: true },
  ]

  const categoriasCreadas: Record<string, string> = {}

  for (const categoria of categorias) {
    try {
      const existing = await payload.find({
        collection: 'categories',
        where: { slug: { equals: categoria.slug } },
      })

      if (existing.docs.length === 0) {
        const created = await payload.create({
          collection: 'categories',
          data: categoria,
        })
        categoriasCreadas[categoria.slug] = created.id
        console.log(`   ✅ ${categoria.nombre}`)
      } else {
        categoriasCreadas[categoria.slug] = existing.docs[0].id
        console.log(`   ⏭️  ${categoria.nombre} ya existe`)
      }
    } catch (error) {
      console.log(`   ❌ Error creando ${categoria.nombre}`)
    }
  }

  // 4. Crear platos de ejemplo
  console.log('\n🍽️  Creando platos de ejemplo...')

  // Obtener IDs de alérgenos
  const alergenosDB = await payload.find({
    collection: 'allergens',
    limit: 100,
  })
  const alergenosPorCodigo: Record<string, string> = {}
  alergenosDB.docs.forEach((a: any) => {
    alergenosPorCodigo[a.codigo] = a.id
  })

  const platos = [
    {
      nombre: 'Jamón Ibérico de Bellota',
      descripcion: 'Jamón ibérico de bellota cortado a cuchillo con pan con tomate',
      precio: 28,
      categoria: 'entrantes',
      activo: true,
      destacado: true,
      orden: 1,
    },
    {
      nombre: 'Croquetas de Jamón',
      descripcion: 'Croquetas caseras de jamón ibérico (6 unidades)',
      precio: 14,
      categoria: 'entrantes',
      alergenos: ['G', 'L', 'H'],
      activo: true,
      orden: 2,
    },
    {
      nombre: 'Ensalada de Burrata',
      descripcion: 'Burrata fresca con tomate cherry, rúcula y reducción de módena',
      precio: 16,
      categoria: 'entrantes',
      alergenos: ['L'],
      activo: true,
      orden: 3,
    },
    {
      nombre: 'Solomillo de Ternera',
      descripcion: 'Solomillo de ternera gallega a la brasa con patatas panaderas',
      precio: 32,
      categoria: 'carnes',
      activo: true,
      destacado: true,
      orden: 1,
    },
    {
      nombre: 'Secreto Ibérico',
      descripcion: 'Secreto ibérico a la plancha con pimientos del padrón',
      precio: 24,
      categoria: 'carnes',
      activo: true,
      orden: 2,
    },
    {
      nombre: 'Lubina a la Espalda',
      descripcion: 'Lubina salvaje a la espalda con verduras de temporada',
      precio: 28,
      categoria: 'pescados',
      alergenos: ['P'],
      activo: true,
      destacado: true,
      orden: 1,
    },
    {
      nombre: 'Gambas al Ajillo',
      descripcion: 'Gambas rojas de Villajoyosa al ajillo',
      precio: 22,
      categoria: 'pescados',
      alergenos: ['C'],
      activo: true,
      orden: 2,
    },
    {
      nombre: 'Arroz Meloso de Bogavante',
      descripcion: 'Arroz meloso con bogavante gallego (mínimo 2 personas)',
      precio: 26,
      categoria: 'arroces',
      alergenos: ['C', 'P'],
      activo: true,
      destacado: true,
      orden: 1,
    },
    {
      nombre: 'Paella Valenciana',
      descripcion: 'Paella tradicional valenciana con pollo, conejo y verduras',
      precio: 18,
      categoria: 'arroces',
      activo: true,
      orden: 2,
    },
    {
      nombre: 'Tarta de Queso',
      descripcion: 'Tarta de queso casera con coulis de frutos rojos',
      precio: 8,
      categoria: 'postres',
      alergenos: ['L', 'H', 'G'],
      activo: true,
      destacado: true,
      orden: 1,
    },
    {
      nombre: 'Brownie con Helado',
      descripcion: 'Brownie de chocolate belga con helado de vainilla',
      precio: 9,
      categoria: 'postres',
      alergenos: ['L', 'H', 'G', 'F'],
      activo: true,
      orden: 2,
    },
  ]

  for (const plato of platos) {
    try {
      const existing = await payload.find({
        collection: 'dishes',
        where: { nombre: { equals: plato.nombre } },
      })

      if (existing.docs.length === 0) {
        const alergenosIds = plato.alergenos?.map(
          (codigo) => alergenosPorCodigo[codigo]
        ).filter(Boolean) || []

        await payload.create({
          collection: 'dishes',
          data: {
            nombre: plato.nombre,
            descripcion: plato.descripcion,
            precio: plato.precio,
            categoria: categoriasCreadas[plato.categoria],
            alergenos: alergenosIds,
            activo: plato.activo,
            destacado: plato.destacado || false,
            orden: plato.orden,
          },
        })
        console.log(`   ✅ ${plato.nombre}`)
      } else {
        console.log(`   ⏭️  ${plato.nombre} ya existe`)
      }
    } catch (error) {
      console.log(`   ❌ Error creando ${plato.nombre}:`, error)
    }
  }

  // 5. Crear configuración del sitio
  console.log('\n⚙️  Configurando Site Settings...')
  try {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        title: 'Restaurante Warynessy',
        description: 'Restaurante de alta cocina mediterránea en Villena, Alicante',
        contact: {
          phone: '+34 965 123 456',
          email: 'reservas@warynessy.com',
          address: 'Calle Principal, 1',
          city: 'Villena',
          province: 'Alicante',
          postalCode: '03400',
          country: 'España',
        },
        openingHours: [
          { days: 'Lunes', closed: true },
          { days: 'Martes a Viernes', hours: '13:00 - 16:00 y 20:30 - 23:30' },
          { days: 'Sábados', hours: '13:00 - 16:30 y 20:30 - 00:00' },
          { days: 'Domingos', hours: '13:00 - 17:00' },
        ],
        socialMedia: {
          instagram: 'https://instagram.com/warynessy',
          facebook: 'https://facebook.com/warynessy',
        },
        copyright: '© 2026 Restaurante Warynessy. Todos los derechos reservados.',
      },
    })
    console.log('   ✅ Site Settings configurado')
  } catch (error) {
    console.log('   ❌ Error configurando Site Settings:', error)
  }

  // Resumen final
  console.log('\n' + '='.repeat(50))
  console.log('🎉 ¡Seed completado!')
  console.log('='.repeat(50))
  console.log('\n📊 Resumen:')
  console.log('   • Usuario admin: admin@warynessy.com / Admin123!')
  console.log('   • 14 alérgenos creados')
  console.log('   • 5 categorías creadas')
  console.log('   • 11 platos de ejemplo creados')
  console.log('   • Configuración del sitio actualizada')
  console.log('\n💡 Próximo paso: Conecta tu frontend Astro a la API de Payload')
  console.log('   Usa las funciones de src/lib/payload.ts para obtener datos\n')

  process.exit(0)
}

seed().catch((error) => {
  console.error('❌ Error en seed:', error)
  process.exit(1)
})
