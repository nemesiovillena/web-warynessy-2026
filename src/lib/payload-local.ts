// Cliente Local de Payload para Astro
// Usa la API local de Payload directamente (sin servidor HTTP)

import { getPayload } from 'payload'
import path from 'path'
import fs from 'fs'
// La configuración se importa dinámicamente en getPayloadClient para evitar caché

let payloadInstance: Awaited<ReturnType<typeof getPayload>> | null = null

export async function getPayloadClient() {
  if (payloadInstance) {
    // Verificamos si el global 'pagina-inicio' tiene el campo 'galeriaRegalo' en sus campos
    const homeGlobal = payloadInstance.config.globals.find(g => g.slug === 'pagina-inicio');
    const hasGaleriaRegalo = homeGlobal?.fields?.some(f => 'name' in f && f.name === 'galeriaRegalo');

    console.log('🔍 getPayloadClient - check galeriaRegalo:', hasGaleriaRegalo);

    if (!hasGaleriaRegalo) {
      console.log('🔄 Re-initializing Payload: galeriaRegalo missing from active instance');
      payloadInstance = null;
    }
  }

  if (!payloadInstance) {
    // RESOLUCIÓN FORZADA PARA PRODUCCIÓN (v6)
    const isProd = process.env.NODE_ENV === 'production'
    const absolutePath = '/app/payload.config.ts'
    const localPath = path.resolve(process.cwd(), 'payload.config.ts')

    // Priorizamos la absoluta en prod para evitar dist/ resolution
    let configPath = isProd ? absolutePath : localPath

    console.log('-------------------------------------------')
    console.log('🚀 INITIALIZING PAYLOAD LOCAL API (v6)')
    console.log('📂 NODE_ENV:', process.env.NODE_ENV)
    console.log('📂 CWD:', process.cwd())
    console.log('📄 Chosen Path:', configPath)
    console.log('🔍 File exists:', fs.existsSync(configPath))
    console.log('🔐 Secret length:', process.env.PAYLOAD_SECRET?.length || 0)
    console.log('🗄️ DB URL present:', !!process.env.DATABASE_URL)
    console.log('-------------------------------------------')

    if (!fs.existsSync(configPath)) {
      if (isProd && fs.existsSync(localPath)) {
        console.warn('⚠️ Falling back to localPath calculation:', localPath)
        configPath = localPath
      } else {
        throw new Error(`❌ Payload config not found at: ${configPath}. CWD: ${process.cwd()}`)
      }
    }

    // Importamos usando un path dinámico total para engañar a Vite
    const finalImportPath = `file://${configPath}?v=${Date.now()}`
    const configModule = await import(/* @vite-ignore */ finalImportPath)
    const freshConfig = configModule.default

    payloadInstance = await getPayload({ config: freshConfig })
    console.log('✅ Payload Instance Ready')
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

  // Refuerzo manual del orden para asegurar consistencia total
  return result.docs.sort((a: any, b: any) => {
    const ordenA = typeof a.orden === 'number' ? a.orden : 999
    const ordenB = typeof b.orden === 'number' ? b.orden : 999
    if (ordenA !== ordenB) return ordenA - ordenB
    return String(a.nombre).localeCompare(String(b.nombre))
  })
}

export async function getMenuBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'menus',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
    depth: 2,
  })
  return result.docs[0] || null
}

export async function getActiveMenusSlugs() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'menus',
    where: {
      activo: { equals: true },
    },
    limit: 100,
  })
  return result.docs.map((doc: any) => doc.slug)
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
    if (!Object.keys(payload.collections).includes('paginas')) {
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

