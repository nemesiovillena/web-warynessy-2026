/**
 * Script de migración: corrige nombres, slugs y orden de categorías en BD.
 * Usa la API REST de Payload (no importa Payload directamente).
 *
 * Ejecutar con: npx tsx scripts/fix-categorias-nombres.ts
 * Requiere: PAYLOAD_ADMIN_PASSWORD en .env (PAYLOAD_API_URL y PAYLOAD_ADMIN_EMAIL opcionales)
 */

import 'dotenv/config'

const API_URL = process.env.PAYLOAD_API_URL || process.env.PUBLIC_PAYLOAD_API_URL || 'http://localhost:3000/api'
const ADMIN_EMAIL = process.env.PAYLOAD_ADMIN_EMAIL || 'info@warynessy.com'
const ADMIN_PASSWORD = process.env.PAYLOAD_ADMIN_PASSWORD || ''

// Mapeo nombre_actual (en BD) → { nombre_correcto, orden }
// Basado en estado real de la BD local vs categorias.json de referencia
const CORRECTIONS: Record<string, { nombre: string; orden: number }> = {
  // ── Categorías principales ──────────────────────────────────────────
  'Aperitivos':               { nombre: 'Aperitivos', orden: 1 },
  'Ensaladas':                { nombre: 'Ensaladas', orden: 2 },
  'Cuchara':                  { nombre: 'Cuchara', orden: 3 },
  'Arroces':                  { nombre: 'Arroces', orden: 4 },
  'Carnes':                   { nombre: 'Carnes', orden: 5 },
  'Pescados':                 { nombre: 'Pescados', orden: 6 },
  'Montaditos y panes':       { nombre: 'Montaditos y panes', orden: 7 },
  'Postres':                  { nombre: 'Postres', orden: 8 },
  'Vinos':                    { nombre: 'Vinos', orden: 9 },
  'Vermut y Cervezas':        { nombre: 'Vermut y Cervezas', orden: 10 },
  'Espumosos y vinos dulces': { nombre: 'Espumosos y vinos dulces', orden: 11 },

  // ── Aperitivos ──────────────────────────────────────────────────────
  'Aperitivos - Gran Variedad': { nombre: 'Aperitivos - Gran Variedad', orden: 1 },
  'Aperitivos - El Mar':        { nombre: 'Aperitivos - El Mar', orden: 1 },
  'Aperitivos - La Tierra':     { nombre: 'Aperitivos - La Tierra', orden: 1 },
  'Aperitivos - La Granja':     { nombre: 'Aperitivos - La Granja', orden: 1 },

  // ── Arroces (nombres reales en BD con capitalización incorrecta) ─────
  'Arroces - Arroces Secos por Encargo':   { nombre: 'Arroces - Arroces secos (por encargo)', orden: 4 },
  'Arroces - Arroces Melosos':             { nombre: 'Arroces - Arroces melosos (por encargo)', orden: 4 },
  // por si ya tienen el formato correcto
  'Arroces - Arroces secos (por encargo)':   { nombre: 'Arroces - Arroces secos (por encargo)', orden: 4 },
  'Arroces - Arroces melosos (por encargo)': { nombre: 'Arroces - Arroces melosos (por encargo)', orden: 4 },

  // ── Montaditos (BD usa orden 11-14 y sin "(Solo por la noche)") ─────
  'Montaditos y Panes - Montaditos':                     { nombre: 'Montaditos y panes - Montaditos (Solo por la noche)', orden: 7 },
  'Montaditos y Panes - Minibocata':                     { nombre: 'Montaditos y panes - Minibocata (Solo por la noche)', orden: 7 },
  'Montaditos y Panes - Hamburguesas':                   { nombre: 'Montaditos y panes - Hamburguesas', orden: 7 },
  'Montaditos y Panes - Pan de Cristal':                 { nombre: 'Montaditos y panes - Pan de cristal', orden: 7 },
  // por si ya tienen minúsculas
  'Montaditos y panes - Montaditos':                     { nombre: 'Montaditos y panes - Montaditos (Solo por la noche)', orden: 7 },
  'Montaditos y panes - Montaditos (Solo por la noche)': { nombre: 'Montaditos y panes - Montaditos (Solo por la noche)', orden: 7 },
  'Montaditos y panes - Minibocata':                     { nombre: 'Montaditos y panes - Minibocata (Solo por la noche)', orden: 7 },
  'Montaditos y panes - Minibocata (Solo por la noche)': { nombre: 'Montaditos y panes - Minibocata (Solo por la noche)', orden: 7 },
  'Montaditos y panes - Hamburguesas':                   { nombre: 'Montaditos y panes - Hamburguesas', orden: 7 },
  'Montaditos y panes - Pan de cristal':                 { nombre: 'Montaditos y panes - Pan de cristal', orden: 7 },

  // ── Vinos Blancos (BD usa "Vinos Blancos - D.O. X" en vez de "Vinos - Blancos D.O. X") ──
  'Vinos Blancos - D.O. Alicante':        { nombre: 'Vinos - Blancos D.O. Alicante', orden: 9 },
  'Vinos Blancos - D.O. Valencia':        { nombre: 'Vinos - Blancos D.O. Valencia', orden: 9 },
  'Vinos Blancos - D.O. Rías Baixas':     { nombre: 'Vinos - Blancos D.O. Rías Baixas', orden: 9 },
  'Vinos Blancos - D.O. Rueda':           { nombre: 'Vinos - Blancos D.O. Rueda', orden: 9 },
  'Vinos Blancos - D.O. Rioja':           { nombre: 'Vinos - Blancos D.O. Rioja', orden: 9 },
  'Vinos Blancos - D.O. Ribera del Duero':{ nombre: 'Vinos - Blancos D.O. Ribera del Duero', orden: 9 },
  'Vinos Blancos - Otras D.O.':           { nombre: 'Vinos - Blancos otras D.O.', orden: 9 },
  // por si ya tienen el formato correcto
  'Vinos - Blancos D.O. Alicante':        { nombre: 'Vinos - Blancos D.O. Alicante', orden: 9 },
  'Vinos - Blancos D.O. Valencia':        { nombre: 'Vinos - Blancos D.O. Valencia', orden: 9 },
  'Vinos - Blancos D.O. Rías Baixas':     { nombre: 'Vinos - Blancos D.O. Rías Baixas', orden: 9 },
  'Vinos - Blancos D.O. Rueda':           { nombre: 'Vinos - Blancos D.O. Rueda', orden: 9 },
  'Vinos - Blancos D.O. Rioja':           { nombre: 'Vinos - Blancos D.O. Rioja', orden: 9 },
  'Vinos - Blancos D.O. Ribera del Duero':{ nombre: 'Vinos - Blancos D.O. Ribera del Duero', orden: 9 },
  'Vinos - Blancos otras D.O.':           { nombre: 'Vinos - Blancos otras D.O.', orden: 9 },

  // ── Vinos Tintos (BD usa "Vinos Tintos - D.O. X" con orden 100+) ───
  'Vinos Tintos - D.O. Alicante':         { nombre: 'Vinos - Tintos D.O. Alicante', orden: 9 },
  'Vinos Tintos - D.O. Valencia':         { nombre: 'Vinos - Tintos D.O. Valencia', orden: 9 },
  'Vinos Tintos - D.O. Jumilla':          { nombre: 'Vinos - Tintos D.O. Jumilla', orden: 9 },
  'Vinos Tintos - D.O. Ribera del Duero': { nombre: 'Vinos - Tintos D.O. Ribera del Duero', orden: 9 },
  'Vinos Tintos - D.O. Rioja':            { nombre: 'Vinos - Tintos D.O. Rioja', orden: 9 },
  'Vinos Tintos - Otras Denominaciones':  { nombre: 'Vinos - Tintos Otras Denominaciones', orden: 9 },
  // por si ya tienen el formato correcto
  'Vinos - Tintos D.O. Alicante':         { nombre: 'Vinos - Tintos D.O. Alicante', orden: 9 },
  'Vinos - Tintos D.O. Valencia':         { nombre: 'Vinos - Tintos D.O. Valencia', orden: 9 },
  'Vinos - Tintos D.O. Jumilla':          { nombre: 'Vinos - Tintos D.O. Jumilla', orden: 9 },
  'Vinos - Tintos D.O. Ribera del Duero': { nombre: 'Vinos - Tintos D.O. Ribera del Duero', orden: 9 },
  'Vinos - Tintos D.O. Rioja':            { nombre: 'Vinos - Tintos D.O. Rioja', orden: 9 },
  'Vinos - Tintos Otras Denominaciones':  { nombre: 'Vinos - Tintos Otras Denominaciones', orden: 9 },

  // ── Vermut y Cervezas ───────────────────────────────────────────────
  'Vermut y Cervezas - Vermut':   { nombre: 'Vermut y Cervezas - Vermut', orden: 10 },
  'Vermut y Cervezas - Cervezas': { nombre: 'Vermut y Cervezas - Cervezas', orden: 10 },

  // ── Espumosos y Vinos Dulces (BD capitaliza "Vinos" con mayúscula) ──
  'Espumosos y Vinos Dulces - Espumosos':    { nombre: 'Espumosos y vinos dulces - Espumosos', orden: 11 },
  'Espumosos y Vinos Dulces - Vinos Dulces': { nombre: 'Espumosos y vinos dulces - Vinos dulces', orden: 11 },
  // por si ya tienen minúsculas
  'Espumosos y vinos dulces - Espumosos':    { nombre: 'Espumosos y vinos dulces - Espumosos', orden: 11 },
  'Espumosos y vinos dulces - Vinos dulces': { nombre: 'Espumosos y vinos dulces - Vinos dulces', orden: 11 },
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

class PayloadAPI {
  private token: string = ''

  constructor(private baseUrl: string) {}

  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!response.ok) { console.error('Login failed:', response.status); return false }
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

  async find(collection: string): Promise<any[]> {
    const response = await fetch(`${this.baseUrl}/${collection}?limit=500`, { headers: this.headers })
    if (!response.ok) throw new Error(`Find failed: ${response.status}`)
    const data = await response.json()
    return data.docs || []
  }

  async update(collection: string, id: string, data: Record<string, any>): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${collection}/${id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Update failed: ${response.status} - ${errorText}`)
    }
  }
}

const migrate = async () => {
  console.log('🔧 Corrigiendo nombres y orden de categorías...\n')
  console.log(`📡 API URL: ${API_URL}`)

  if (!ADMIN_PASSWORD) {
    console.error('\n❌ Necesitas configurar PAYLOAD_ADMIN_PASSWORD en .env')
    process.exit(1)
  }

  const api = new PayloadAPI(API_URL)

  console.log(`\n🔐 Iniciando sesión como ${ADMIN_EMAIL}...`)
  if (!await api.login(ADMIN_EMAIL, ADMIN_PASSWORD)) {
    console.error('❌ No se pudo iniciar sesión.')
    process.exit(1)
  }
  console.log('   ✅ Sesión iniciada')

  console.log('\n📂 Obteniendo categorías...')
  const categorias = await api.find('categorias')
  console.log(`   ${categorias.length} categorías encontradas\n`)

  // Categorías que no deben existir según el JSON de referencia
  const TO_DELETE = ['Entrantes', 'Vinos sin Alcohol']

  let updated = 0
  let skipped = 0
  let unknown = 0

  for (const cat of categorias) {
    const currentNombre = cat.nombre as string

    // Avisar sobre categorías obsoletas (no las borramos automáticamente — decisión manual)
    if (TO_DELETE.includes(currentNombre)) {
      console.log(`  🗑️  "${currentNombre}" no está en el JSON de referencia → eliminar manualmente si no tiene platos`)
      unknown++
      continue
    }

    const correction = CORRECTIONS[currentNombre]

    if (!correction) {
      console.log(`  ⚠️  Sin corrección para: "${currentNombre}"`)
      unknown++
      continue
    }

    const needsUpdate = (
      cat.nombre !== correction.nombre ||
      cat.orden !== correction.orden
    )

    if (!needsUpdate) {
      console.log(`  ⏭️  "${currentNombre}" ya es correcto`)
      skipped++
      continue
    }

    try {
      await api.update('categorias', cat.id, {
        nombre: correction.nombre,
        slug: generateSlug(correction.nombre),
        orden: correction.orden,
      })
      console.log(`  ✅ "${currentNombre}" → "${correction.nombre}" (orden: ${correction.orden})`)
      updated++
    } catch (error) {
      console.log(`  ❌ Error actualizando "${currentNombre}":`, error)
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('✨ Migración completada!')
  console.log('='.repeat(50))
  console.log(`\n   ✅ Actualizadas: ${updated}`)
  console.log(`   ⏭️  Ya correctas: ${skipped}`)
  console.log(`   ⚠️  Sin corrección: ${unknown}\n`)

  process.exit(0)
}

migrate().catch((error) => {
  console.error('❌ Error:', error)
  process.exit(1)
})
