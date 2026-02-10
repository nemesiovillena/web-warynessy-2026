/**
 * Script para corregir los nombres de las categorías de vinos tintos
 * Añade el prefijo "Vinos - " para que se agrupen correctamente en el frontend
 */

import 'dotenv/config'

const API_URL = process.env.PAYLOAD_API_URL || 'https://warynessy.com/api'
const ADMIN_EMAIL = process.env.PAYLOAD_ADMIN_EMAIL || 'info@warynessy.com'
const ADMIN_PASSWORD = process.env.PAYLOAD_ADMIN_PASSWORD || ''

// Mapeo de nombres incorrectos a nombres correctos
const categoryFixes: Record<string, string> = {
  'Tintos D.O. Alicante': 'Vinos - Tintos D.O. Alicante',
  'Tintos D.O. Valencia': 'Vinos - Tintos D.O. Valencia',
  'Tintos D.O. Jumilla': 'Vinos - Tintos D.O. Jumilla',
  'Tintos D.O. Ribera del Duero': 'Vinos - Tintos D.O. Ribera del Duero',
  'Tintos D.O. Rioja': 'Vinos - Tintos D.O. Rioja',
  'Tintos Otras Denominaciones': 'Vinos - Tintos Otras Denominaciones',
}

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
        console.error('Login failed:', response.status)
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
    if (!response.ok) throw new Error(`Find failed: ${response.status}`)

    const data = await response.json()
    return data.docs || []
  }

  async update(collection: string, id: string, data: Record<string, any>): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${collection}/${id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Update failed: ${response.status} - ${errorText}`)
    }

    return response.json()
  }
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const fixCategorias = async () => {
  console.log('🔧 Corrigiendo nombres de categorías de vinos tintos...\n')
  console.log(`📡 API URL: ${API_URL}`)

  if (!ADMIN_PASSWORD) {
    console.error('\n❌ Error: Necesitas configurar PAYLOAD_ADMIN_PASSWORD en .env')
    process.exit(1)
  }

  const api = new PayloadAPI(API_URL)

  // Login
  console.log(`\n🔐 Iniciando sesión como ${ADMIN_EMAIL}...`)
  const loginSuccess = await api.login(ADMIN_EMAIL, ADMIN_PASSWORD)

  if (!loginSuccess) {
    console.error('❌ No se pudo iniciar sesión.')
    process.exit(1)
  }
  console.log('   ✅ Sesión iniciada')

  // Obtener todas las categorías
  console.log('\n📂 Buscando categorías a corregir...')
  const categorias = await api.find('categorias')

  let corregidas = 0

  for (const [oldName, newName] of Object.entries(categoryFixes)) {
    const cat = categorias.find((c: any) => c.nombre === oldName)

    if (cat) {
      try {
        const newSlug = generateSlug(newName)
        await api.update('categorias', cat.id, {
          nombre: newName,
          slug: newSlug,
        })
        console.log(`   ✅ "${oldName}" → "${newName}"`)
        corregidas++
      } catch (error) {
        console.log(`   ❌ Error corrigiendo "${oldName}":`, error)
      }
    } else {
      console.log(`   ⏭️  "${oldName}" no encontrada (ya corregida o no existe)`)
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('🎉 Corrección completada!')
  console.log('='.repeat(50))
  console.log(`\n📊 Categorías corregidas: ${corregidas}`)
  console.log('\n💡 Ahora los vinos tintos aparecerán en la sección "Vinos" del frontend.\n')

  process.exit(0)
}

fixCategorias().catch((error) => {
  console.error('❌ Error:', error)
  process.exit(1)
})
