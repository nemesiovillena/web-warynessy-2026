// Cliente REST de Payload para Astro
// Usa la API REST de Payload en lugar de la API local para evitar conflictos de inicialización

const API_URL = import.meta.env.PUBLIC_PAYLOAD_API_URL || process.env.PUBLIC_PAYLOAD_API_URL || 'https://admin.warynessy.eneweb.es/api'
console.log('--------------------------------------------------')
console.log('🔧 [DEBUG] Payload API URL:', API_URL)
console.log('--------------------------------------------------')

interface PayloadResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      ...options,
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      console.error(`API Error: ${response.status} - ${url}`)
      throw new Error(`API request failed: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error)
    throw error
  }
}

// Helper para construir query strings de Payload
function buildQuery(params: Record<string, any>): string {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      if (typeof value === 'object') {
        searchParams.set(key, JSON.stringify(value))
      } else {
        searchParams.set(key, String(value))
      }
    }
  }

  const query = searchParams.toString()
  return query ? `?${query}` : ''
}

// ============================================
// COLECCIONES
// ============================================

export async function getPlatos(activo = true, locale?: string) {
  const where = activo ? { activo: { equals: true } } : {}
  const params: any = { where, sort: 'orden', depth: 2, limit: 500 }
  if (locale) params.locale = locale
  const query = buildQuery(params)
  const result = await fetchAPI<PayloadResponse<any>>(`/platos${query}`)
  return result.docs
}

export async function getPlatosPorCategoria(categoriaId: string, activo = true, locale?: string) {
  const where: any = { categoria: { equals: categoriaId } }
  if (activo) where.activo = { equals: true }
  const params: any = { where, sort: 'orden', depth: 2, limit: 100 }
  if (locale) params.locale = locale
  const query = buildQuery(params)
  const result = await fetchAPI<PayloadResponse<any>>(`/platos${query}`)
  return result.docs
}

export async function getCategorias(activa = true, locale?: string) {
  const where = activa ? { activa: { equals: true } } : {}
  const params: any = { where, sort: 'orden', limit: 100 }
  if (locale) params.locale = locale
  const query = buildQuery(params)
  const result = await fetchAPI<PayloadResponse<any>>(`/categorias${query}`)
  return result.docs
}

export async function getAlergenos(locale?: string) {
  const params: any = { sort: 'orden', limit: 100 }
  if (locale) params.locale = locale
  const query = buildQuery(params)
  const result = await fetchAPI<PayloadResponse<any>>(`/alergenos${query}`)
  return result.docs
}

export async function getMenus(activo = true, locale?: string) {
  const where = activo ? { activo: { equals: true } } : {}
  const params: any = { where, sort: 'orden', depth: 1, limit: 100 }
  if (locale) params.locale = locale
  const query = buildQuery(params)
  const result = await fetchAPI<PayloadResponse<any>>(`/menus${query}`)

  // Refuerzo manual del orden para asegurar consistencia total
  return result.docs.sort((a: any, b: any) => {
    const ordenA = typeof a.orden === 'number' ? a.orden : 999
    const ordenB = typeof b.orden === 'number' ? b.orden : 999
    if (ordenA !== ordenB) return ordenA - ordenB
    return String(a.nombre).localeCompare(String(b.nombre))
  })
}

export async function getMenuBySlug(slug: string, locale?: string) {
  // Use direct query string format for Payload REST API
  let url = `/menus?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=2`
  if (locale) url += `&locale=${locale}`
  const result = await fetchAPI<PayloadResponse<any>>(url)
  return result.docs[0] || null
}

export async function getActiveMenusSlugs() {
  // Use direct query string format for Payload REST API
  const url = `/menus?where[activo][equals]=true&limit=100`
  const result = await fetchAPI<PayloadResponse<any>>(url)
  return result.docs.map((doc: any) => doc.slug)
}

export async function getEspacios(activo = true, locale?: string) {
  const where = activo ? { activo: { equals: true } } : {}
  const params: any = { where, sort: 'orden', depth: 1, limit: 100 }
  if (locale) params.locale = locale
  const query = buildQuery(params)
  const result = await fetchAPI<PayloadResponse<any>>(`/espacios${query}`)
  return result.docs
}

export async function getMenusGrupo(activo = true, locale?: string) {
  try {
    // Use direct query string format for Payload REST API
    let url = activo
      ? `/menus-grupo?where[activo][equals]=true&sort=orden&depth=2&limit=100`
      : `/menus-grupo?sort=orden&depth=2&limit=100`

    if (locale) url += `&locale=${locale}`

    const result = await fetchAPI<PayloadResponse<any>>(url)

    if (!result || !result.docs) return []

    return result.docs.sort((a: any, b: any) => {
      const ordenA = typeof a.orden === 'number' ? a.orden : 999
      const ordenB = typeof b.orden === 'number' ? b.orden : 999
      return ordenA - ordenB
    })
  } catch (error) {
    console.error('Error fetching menus-grupo:', error)
    return []
  }
}

// Alias for backward compatibility
export const getGroupMenus = getMenusGrupo



export async function getBannersActivos(posicion?: string, locale?: string) {
  const now = new Date().toISOString()

  const where: any = {
    activo: { equals: true },
    fechaInicio: { less_than_equal: now },
    fechaFin: { greater_than_equal: now },
  }

  if (posicion) {
    where.posicion = { equals: posicion }
  }

  const params: any = { where, sort: '-prioridad', depth: 1, limit: 100 }
  if (locale) params.locale = locale
  const query = buildQuery(params)

  const result = await fetchAPI<PayloadResponse<any>>(`/banners${query}`)
  return result.docs
}

// ============================================
// GLOBALS
// ============================================

export async function getPaginaInicio(locale?: string) {
  const params: any = { depth: 3 }
  if (locale) params.locale = locale
  const query = buildQuery(params)
  return fetchAPI<any>(`/globals/pagina-inicio${query}`)
}

export async function getConfiguracionSitio(locale?: string) {
  const params: any = { depth: 1 }
  if (locale) params.locale = locale
  const query = buildQuery(params)
  return fetchAPI<any>(`/globals/configuracion-sitio${query}`)
}

export async function getPaginaBySlug(slug: string, locale?: string) {
  try {
    // Use direct query string format for Payload REST API
    let url = `/paginas?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=1`
    if (locale) url += `&locale=${locale}`

    const result = await fetchAPI<PayloadResponse<any>>(url)
    return result.docs[0] || null
  } catch (error) {
    console.error(`Error al obtener pagina por slug (${slug}):`, error)
    return null
  }
}

// ============================================
// UTILIDADES
// ============================================

export async function getCategoriasConPlatos(locale?: string) {
  const categorias = await getCategorias(true, locale)
  const platos = await getPlatos(true, locale)

  return categorias.map((categoria: any) => ({
    ...categoria,
    platos: platos.filter((plato: any) =>
      plato.categoria?.id === categoria.id || plato.categoria === categoria.id
    ),
  }))
}

export async function getPlatosDestacados(locale?: string) {
  const where = {
    activo: { equals: true },
    destacado: { equals: true },
  }
  const params: any = { where, sort: 'orden', depth: 2, limit: 10 }
  if (locale) params.locale = locale
  const query = buildQuery(params)
  const result = await fetchAPI<PayloadResponse<any>>(`/platos${query}`)
  return result.docs
}

// ============================================
// ALIAS (compatibilidad con nombres anteriores)
// ============================================

export const getDishes = getPlatos
export const getDishesByCategory = getPlatosPorCategoria
export const getCategories = getCategorias
export const getAllergens = getAlergenos
export const getSpaces = getEspacios
export const getActiveBanners = getBannersActivos
export const getHomepage = getPaginaInicio
export const getSiteSettings = getConfiguracionSitio
export const getCategoriesWithDishes = getCategoriasConPlatos
export const getFeaturedDishes = getPlatosDestacados
