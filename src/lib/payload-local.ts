// Cliente Local de Payload para Astro
// Usa la API local de Payload directamente (sin servidor HTTP)

import { getPayload } from 'payload'
// La configuración se importa dinámicamente en getPayloadClient para evitar caché

let payloadInstance: Awaited<ReturnType<typeof getPayload>> | null = null

export async function getPayloadClient() {
  // Si la instancia ya existe, verificamos si contiene todas las colecciones necesarias
  if (payloadInstance) {
    const collections = Object.keys(payloadInstance.collections)
    if (!collections.includes('paginas')) {
      console.log('⚠️ Detectada configuración antigua de Payload. Reinicializando...')
      payloadInstance = null
    }
  }

  if (!payloadInstance) {
    // Importamos la configuración dinámicamente para evitar problemas de caché en desarrollo
    const configModule = await import('../../payload.config')
    const freshConfig = configModule.default

    payloadInstance = await getPayload({ config: freshConfig })
    console.log('🚀 Payload Initialized with collections:', Object.keys(payloadInstance.collections))
  }
  return payloadInstance
}

// ============================================
// COLECCIONES
// ============================================

export async function getPlatos(activo = true) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'platos',
    where: activo ? { activo: { equals: true } } : {},
    sort: 'orden',
    depth: 2,
    limit: 500,
  })
  return result.docs
}

export async function getPlatosPorCategoria(categoriaId: string, activo = true) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'platos',
    where: {
      categoria: { equals: categoriaId },
      ...(activo ? { activo: { equals: true } } : {}),
    },
    sort: 'orden',
    depth: 2,
    limit: 100,
  })
  return result.docs
}

export async function getCategorias(activa = true) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'categorias',
    where: activa ? { activa: { equals: true } } : {},
    sort: 'orden',
    limit: 100,
  })
  return result.docs
}

export async function getAlergenos() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'alergenos',
    sort: 'orden',
    limit: 100,
  })
  return result.docs
}

export async function getMenus(activo = true) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'menus',
    where: activo ? { activo: { equals: true } } : {},
    sort: 'orden',
    depth: 1,
    limit: 100,
  })
  return result.docs
}

export async function getEspacios(activo = true) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'espacios',
    where: activo ? { activo: { equals: true } } : {},
    sort: 'orden',
    depth: 1,
    limit: 100,
  })
  return result.docs
}


export async function getBannersActivos(posicion?: string) {
  const payload = await getPayloadClient()
  const now = new Date().toISOString()

  const where: any = {
    activo: { equals: true },
    fechaInicio: { less_than_equal: now },
    fechaFin: { greater_than_equal: now },
  }

  if (posicion) {
    where.posicion = { equals: posicion }
  }

  const result = await payload.find({
    collection: 'banners',
    where,
    sort: '-prioridad',
    depth: 1,
    limit: 100,
  })
  return result.docs
}

// ============================================
// GLOBALS
// ============================================

export async function getPaginaInicio() {
  const payload = await getPayloadClient()
  return payload.findGlobal({
    slug: 'pagina-inicio',
    depth: 3,
  })
}

export async function getConfiguracionSitio() {
  const payload = await getPayloadClient()
  return payload.findGlobal({
    slug: 'configuracion-sitio',
    depth: 1,
  })
}

export async function getPaginaBySlug(slug: string) {
  try {
    const payload = await getPayloadClient()

    // Verificamos si la colección existe antes de buscar
    if (!payload.collections['paginas' as any]) {
      console.warn(`⚠️ La colección "paginas" no está disponible en esta instancia de Payload.`);
      return null;
    }

    const result = await payload.find({
      collection: 'paginas',
      where: {
        slug: { equals: slug },
      },
      limit: 1,
      depth: 1,
    })
    return result.docs[0] || null
  } catch (error) {
    console.error(`❌ Error al obtener página por slug (${slug}):`, error);
    return null;
  }
}

// ============================================
// UTILIDADES
// ============================================

export async function getCategoriasConPlatos() {
  const categorias = await getCategorias()
  const platos = await getPlatos()

  return categorias.map((categoria: any) => ({
    ...categoria,
    platos: platos.filter((plato: any) =>
      plato.categoria?.id === categoria.id || plato.categoria === categoria.id
    ),
  }))
}

export async function getPlatosDestacados() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'platos',
    where: {
      activo: { equals: true },
      destacado: { equals: true },
    },
    sort: 'orden',
    depth: 2,
    limit: 10,
  })
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

