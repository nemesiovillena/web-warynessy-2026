/**
 * Script de importación de Vinos Tintos via API REST de Payload
 *
 * Uso: npx tsx scripts/import-vinos-tintos.ts
 *
 * Variables de entorno requeridas:
 * - PAYLOAD_API_URL (default: https://admin.warynessy.eneweb.es/api)
 * - PAYLOAD_ADMIN_EMAIL
 * - PAYLOAD_ADMIN_PASSWORD
 */

import 'dotenv/config'

const API_URL = process.env.PAYLOAD_API_URL || 'https://warynessy.com/api'
const ADMIN_EMAIL = process.env.PAYLOAD_ADMIN_EMAIL || 'info@warynessy.com'
const ADMIN_PASSWORD = process.env.PAYLOAD_ADMIN_PASSWORD || ''

// Datos de vinos tintos extraídos del CSV
const vinosTintos = [
  // Tintos D.O. Alicante
  { nombre: 'Patojo ecológico roble', precio: 15, subcategoria: 'Tintos D.O. Alicante', imagen: 'patojo_ecolgico_roble.webp' },
  { nombre: 'Casa Ritas', precio: 13, subcategoria: 'Tintos D.O. Alicante', imagen: 'casa_ritas.webp' },
  { nombre: 'Vinalopó joven', precio: 10, subcategoria: 'Tintos D.O. Alicante', imagen: 'vinalop_joven.webp' },
  { nombre: 'Fruto Noble. Vino de Finca', precio: 14, subcategoria: 'Tintos D.O. Alicante', imagen: 'fruto_noble_vino_de_finca.webp' },
  { nombre: 'La viña de Mateo', precio: 19, subcategoria: 'Tintos D.O. Alicante', imagen: 'la_via_de_mateo.webp' },
  { nombre: 'La Casica del abuelo', precio: 15, subcategoria: 'Tintos D.O. Alicante', imagen: 'la_casica_del_abuelo.webp' },
  { nombre: 'Casa Balaguer', precio: 20, subcategoria: 'Tintos D.O. Alicante', imagen: 'casa_balaguer.webp' },
  { nombre: 'Sein 2020', precio: 20, subcategoria: 'Tintos D.O. Alicante', imagen: 'sein_2020.webp' },
  { nombre: 'El Telar. 2019', precio: 32, subcategoria: 'Tintos D.O. Alicante', imagen: 'el_telar_2019.webp' },
  { nombre: 'Carabibas Vendimia Seleccionada', precio: 28, subcategoria: 'Tintos D.O. Alicante', imagen: 'carabibas_vendimia_seleccionada.webp' },
  { nombre: 'Tarima Hill. 12 meses', precio: 20, subcategoria: 'Tintos D.O. Alicante', imagen: 'tarima_hill_12_meses.webp' },
  { nombre: 'Laudum roble', precio: 12, subcategoria: 'Tintos D.O. Alicante', imagen: 'laudum_roble.webp' },
  { nombre: 'Fuego Lento 2013', precio: 35, subcategoria: 'Tintos D.O. Alicante', imagen: 'fuego_lento_2013.webp' },
  { nombre: 'Fuego Lento Secano Extremo', precio: 20, subcategoria: 'Tintos D.O. Alicante', imagen: 'fuego_lento_secano_extremo.webp' },
  { nombre: 'Umbría Salinas', precio: 16, subcategoria: 'Tintos D.O. Alicante', imagen: 'umbra_salinas.webp' },
  { nombre: 'Mira Salinas', precio: 25, subcategoria: 'Tintos D.O. Alicante', imagen: 'mira_salinas.webp' },
  { nombre: 'Enrique Mendoza Cabernet, Monastrell', precio: 19, subcategoria: 'Tintos D.O. Alicante', imagen: 'enrique_mendoza_cabernet_monastrell.webp' },
  { nombre: 'Enrique Mendoza Merlot, Monastrell', precio: 19, subcategoria: 'Tintos D.O. Alicante', imagen: 'enrique_mendoza_merlot_monastrell.webp' },
  { nombre: 'Santa Rosa Enrique Mendoza 2020', precio: 34, subcategoria: 'Tintos D.O. Alicante', imagen: 'santa_rosa_enrique_mendoza_2020.webp' },
  { nombre: 'Casa agrícola. Pepe Mendoza', precio: 20, subcategoria: 'Tintos D.O. Alicante', imagen: 'casa_agrcola_pepe_mendoza.webp' },

  // Tintos D.O. Valencia
  { nombre: 'Sentada sobre la bestia. 2018', precio: 17, subcategoria: 'Tintos D.O. Valencia', imagen: 'sentada_sobre_la_bestia_2018.webp' },
  { nombre: 'El cordero y las vírgenes', precio: 35, subcategoria: 'Tintos D.O. Valencia', imagen: 'el_cordero_y_las_vrgenes.webp' },
  { nombre: 'Sensal 2021', precio: 30, subcategoria: 'Tintos D.O. Valencia', imagen: 'sensal_2021.webp' },
  { nombre: 'Venta del Puerto No 12', precio: 20, subcategoria: 'Tintos D.O. Valencia', imagen: 'venta_del_puerto_no_12.webp' },

  // Tintos D.O. Jumilla
  { nombre: 'Juan Gil. Plata', precio: 22, subcategoria: 'Tintos D.O. Jumilla', imagen: 'juan_gil_plata.webp' },
  { nombre: 'Juan Gil. Azul. 2022', precio: 40, subcategoria: 'Tintos D.O. Jumilla', imagen: 'juan_gil_azul_2022.webp' },
  { nombre: 'Matas Altas Pie Franco', precio: 28, subcategoria: 'Tintos D.O. Jumilla', imagen: 'matas_altas_pie_franco.webp' },
  { nombre: 'Valtosca 2023. Vino de parcela shiraz', precio: 35, subcategoria: 'Tintos D.O. Jumilla', imagen: 'valtosca_2023_vino_de_parcela_shiraz.webp' },
  { nombre: 'Casa castillo el Molar. 2021', precio: 30, subcategoria: 'Tintos D.O. Jumilla', imagen: 'casa_castillo_el_molar_2021.webp' },
  { nombre: 'Casa castillo Las Gravas 2021', precio: 72, subcategoria: 'Tintos D.O. Jumilla', imagen: 'casa_castillo_las_gravas_2021.webp' },
  { nombre: 'Machoman Monastrell', precio: 35, subcategoria: 'Tintos D.O. Jumilla', imagen: 'machoman_monastrell.webp' },

  // Tintos D.O. Ribera del Duero
  { nombre: 'CLON-98 Tempranillo', precio: 20, subcategoria: 'Tintos D.O. Ribera del Duero', imagen: 'clon-98_tempranillo.webp' },
  { nombre: 'Tintafina Tempranillo', precio: 35, subcategoria: 'Tintos D.O. Ribera del Duero', imagen: 'tintafina_tempranillo.webp' },
  { nombre: 'Finca Resalso', precio: 18, subcategoria: 'Tintos D.O. Ribera del Duero', imagen: 'finca_resalso.webp' },
  { nombre: 'Emilio Moro. Crianza', precio: 32, subcategoria: 'Tintos D.O. Ribera del Duero', imagen: 'emilio_moro_crianza.webp' },
  { nombre: 'Traslascuestas 8 meses', precio: 16, subcategoria: 'Tintos D.O. Ribera del Duero', imagen: 'traslascuestas_8_meses.webp' },
  { nombre: 'Pago de los Capellanes. Roble. 2024', precio: 26, subcategoria: 'Tintos D.O. Ribera del Duero', imagen: 'pago_de_los_capellanes_roble_2024.webp' },
  { nombre: 'Pago de Capellanes «el Nogal» 2019', precio: 80, subcategoria: 'Tintos D.O. Ribera del Duero', imagen: 'pago_de_capellanes_el_nogal_2019.webp' },
  { nombre: 'Pago de Capellanes «el Nogal» 2016. Magnum', precio: 160, subcategoria: 'Tintos D.O. Ribera del Duero', imagen: 'pago_de_capellanes_el_nogal_2016_magnum.webp' },
  { nombre: 'Protos Roble', precio: 15, subcategoria: 'Tintos D.O. Ribera del Duero', imagen: 'protos_roble.webp' },
  { nombre: 'Protos. Crianza', precio: 29, subcategoria: 'Tintos D.O. Ribera del Duero', imagen: 'protos_crianza.webp' },
  { nombre: 'Matarromera Crianza', precio: 38, subcategoria: 'Tintos D.O. Ribera del Duero', imagen: 'matarromera_crianza.webp' },
  { nombre: 'Pesquera. Crianza', precio: 35, subcategoria: 'Tintos D.O. Ribera del Duero', imagen: 'pesquera_crianza.webp' },
  { nombre: 'Dominio de Atauta. 2021', precio: 45, subcategoria: 'Tintos D.O. Ribera del Duero', imagen: 'dominio_de_atauta_2021.webp' },
  { nombre: 'Aalto. 2021', precio: 65, subcategoria: 'Tintos D.O. Ribera del Duero', imagen: 'aalto_2021.webp' },

  // Tintos D.O. Rioja
  { nombre: 'Fernández de Pierola Crianza', precio: 18, subcategoria: 'Tintos D.O. Rioja', imagen: 'fernndez_de_pierola_crianza.webp' },
  { nombre: 'Muga', precio: 31, subcategoria: 'Tintos D.O. Rioja', imagen: 'muga.webp' },
  { nombre: 'Nada que ver. 2017', precio: 38, subcategoria: 'Tintos D.O. Rioja', imagen: 'nada_que_ver_2017.webp' },
  { nombre: 'Miguel Merino Vitola. 2020', precio: 35, subcategoria: 'Tintos D.O. Rioja', imagen: 'miguel_merino_vitola_2020.webp' },
  { nombre: 'Conde de los Andes. 2016', precio: 30, subcategoria: 'Tintos D.O. Rioja', imagen: 'conde_de_los_andes_2016.webp' },
  { nombre: 'Ukan 2019', precio: 60, subcategoria: 'Tintos D.O. Rioja', imagen: 'ukan_2019.webp' },
  { nombre: 'Prado de Enea. Gran reserva', precio: 95, subcategoria: 'Tintos D.O. Rioja', imagen: 'prado_de_enea_gran_reserva.webp' },
  { nombre: 'Marqués de Riscal. Reserva 2020', precio: 28, subcategoria: 'Tintos D.O. Rioja', imagen: 'marqus_de_riscal_reserva_2020.webp' },
  { nombre: 'Faustino Autor Reserva Especial', precio: 45, subcategoria: 'Tintos D.O. Rioja', imagen: 'faustino_autor_reserva_especial.webp' },

  // Tintos Otras Denominaciones
  { nombre: 'Alaya Tierra', precio: 38, subcategoria: 'Tintos Otras Denominaciones', imagen: 'alaya_tierra.webp' },
  { nombre: 'Abadía Retuerta. Selección especial 2020', precio: 49, subcategoria: 'Tintos Otras Denominaciones', imagen: 'abada_retuerta_seleccin_especial_2020.webp' },
  { nombre: 'Mauro. 2021', precio: 55, subcategoria: 'Tintos Otras Denominaciones', imagen: 'mauro_2021.webp' },
  { nombre: 'San Román. 2018', precio: 50, subcategoria: 'Tintos Otras Denominaciones', imagen: 'san_romn_2018.webp' },
  { nombre: 'San Román. 2020', precio: 45, subcategoria: 'Tintos Otras Denominaciones', imagen: 'san_romn_2020.webp' },
  { nombre: 'Flor de Vetus', precio: 18, subcategoria: 'Tintos Otras Denominaciones', imagen: 'flor_de_vetus.webp' },
  { nombre: 'Matsu «El Recio». Viñas viejas', precio: 24, subcategoria: 'Tintos Otras Denominaciones', imagen: 'matsu_el_recio_vias_viejas.webp' },
  { nombre: 'Pissarres tinto', precio: 25, subcategoria: 'Tintos Otras Denominaciones', imagen: 'pissarres_tinto.webp' },
]

// Función para generar slug
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Cliente API con autenticación
class PayloadAPI {
  private token: string = ''
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        console.error('Login failed:', response.status, await response.text())
        return false
      }

      const data = await response.json()
      this.token = data.token
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  private get headers() {
    return {
      'Content-Type': 'application/json',
      ...(this.token ? { Authorization: `JWT ${this.token}` } : {}),
    }
  }

  async find(collection: string, where?: Record<string, any>): Promise<any[]> {
    let url = `${this.baseUrl}/${collection}?limit=500`
    if (where) {
      for (const [key, value] of Object.entries(where)) {
        url += `&where[${key}][equals]=${encodeURIComponent(value)}`
      }
    }

    const response = await fetch(url, { headers: this.headers })
    if (!response.ok) {
      throw new Error(`Find failed: ${response.status}`)
    }

    const data = await response.json()
    return data.docs || []
  }

  async create(collection: string, data: Record<string, any>): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${collection}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Create failed: ${response.status} - ${errorText}`)
    }

    return response.json()
  }
}

const importVinosTintos = async () => {
  console.log('🍷 Importando Vinos Tintos via API REST...\n')
  console.log(`📡 API URL: ${API_URL}`)

  if (!ADMIN_PASSWORD) {
    console.error('\n❌ Error: Necesitas configurar PAYLOAD_ADMIN_PASSWORD en .env')
    console.log('\nAñade esta línea a tu .env:')
    console.log('PAYLOAD_ADMIN_PASSWORD=tu_contraseña_de_admin\n')
    process.exit(1)
  }

  const api = new PayloadAPI(API_URL)

  // 1. Login
  console.log(`\n🔐 Iniciando sesión como ${ADMIN_EMAIL}...`)
  const loginSuccess = await api.login(ADMIN_EMAIL, ADMIN_PASSWORD)

  if (!loginSuccess) {
    console.error('❌ No se pudo iniciar sesión. Verifica las credenciales.')
    process.exit(1)
  }
  console.log('   ✅ Sesión iniciada correctamente')

  // 2. Crear categorías de vinos tintos
  console.log('\n📂 Creando/verificando categorías de vinos tintos...')

  const subcategorias = [
    'Tintos D.O. Alicante',
    'Tintos D.O. Valencia',
    'Tintos D.O. Jumilla',
    'Tintos D.O. Ribera del Duero',
    'Tintos D.O. Rioja',
    'Tintos Otras Denominaciones',
  ]

  const categoriasCreadas: Record<string, string> = {}
  let ordenBase = 100

  for (const subcategoria of subcategorias) {
    const slug = generateSlug(subcategoria)

    try {
      const existing = await api.find('categorias', { slug })

      if (existing.length === 0) {
        const created = await api.create('categorias', {
          nombre: subcategoria,
          slug: slug,
          descripcion: `Vinos tintos ${subcategoria.replace('Tintos ', '')}`,
          orden: ordenBase,
          activa: true,
        })
        categoriasCreadas[subcategoria] = created.doc?.id || created.id
        console.log(`   ✅ Categoría creada: ${subcategoria}`)
      } else {
        categoriasCreadas[subcategoria] = existing[0].id
        console.log(`   ⏭️  Categoría existente: ${subcategoria}`)
      }
    } catch (error) {
      console.log(`   ❌ Error con categoría ${subcategoria}:`, error)
    }

    ordenBase += 1
  }

  // 3. Importar vinos
  console.log('\n🍷 Importando vinos tintos...')

  let importados = 0
  let existentes = 0
  let errores = 0

  for (let i = 0; i < vinosTintos.length; i++) {
    const vino = vinosTintos[i]

    try {
      // Verificar si ya existe
      const existing = await api.find('platos', { nombre: vino.nombre })

      if (existing.length > 0) {
        console.log(`   ⏭️  ${vino.nombre} (ya existe)`)
        existentes++
        continue
      }

      // Crear el vino
      await api.create('platos', {
        nombre: vino.nombre,
        descripcion: vino.subcategoria,
        precio: vino.precio,
        categoria: categoriasCreadas[vino.subcategoria],
        activo: true,
        destacado: false,
        orden: i + 1,
      })

      console.log(`   ✅ ${vino.nombre} - ${vino.precio}€`)
      importados++

      // Pequeña pausa para no saturar la API
      await new Promise(resolve => setTimeout(resolve, 100))
    } catch (error) {
      console.log(`   ❌ Error importando ${vino.nombre}:`, error)
      errores++
    }
  }

  // Resumen
  console.log('\n' + '='.repeat(50))
  console.log('🎉 Importación completada!')
  console.log('='.repeat(50))
  console.log(`\n📊 Resumen:`)
  console.log(`   • Vinos importados: ${importados}`)
  console.log(`   • Ya existentes: ${existentes}`)
  console.log(`   • Errores: ${errores}`)
  console.log(`   • Total procesados: ${vinosTintos.length}`)
  console.log('\n💡 Nota: Las imágenes deben asociarse desde el admin de Payload\n')

  process.exit(0)
}

importVinosTintos().catch((error) => {
  console.error('❌ Error en importación:', error)
  process.exit(1)
})
