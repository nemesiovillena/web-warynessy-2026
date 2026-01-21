// Payload API client for Astro
// This file provides helper functions to fetch data from Payload CMS

const PAYLOAD_API_URL = import.meta.env.PUBLIC_PAYLOAD_API_URL || 'http://localhost:3000/api'

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

/**
 * Fetch data from Payload CMS
 */
async function fetchPayload<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${PAYLOAD_API_URL}/${endpoint}`

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch from Payload: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Get all documents from a collection
 */
export async function getAll<T>(collection: string, query: Record<string, any> = {}): Promise<T[]> {
  const params = new URLSearchParams()

  if (query.where) {
    params.append('where', JSON.stringify(query.where))
  }
  if (query.sort) {
    params.append('sort', query.sort)
  }
  if (query.limit) {
    params.append('limit', query.limit.toString())
  }
  if (query.depth) {
    params.append('depth', query.depth.toString())
  }

  const queryString = params.toString()
  const endpoint = `${collection}${queryString ? `?${queryString}` : ''}`

  const data = await fetchPayload<PayloadResponse<T>>(endpoint)
  return data.docs
}

/**
 * Get a single document by ID
 */
export async function getById<T>(collection: string, id: string, depth = 1): Promise<T> {
  return fetchPayload<T>(`${collection}/${id}?depth=${depth}`)
}

/**
 * Get a single document by slug
 */
export async function getBySlug<T>(collection: string, slug: string, depth = 1): Promise<T | null> {
  const data = await getAll<T>(collection, {
    where: { slug: { equals: slug } },
    limit: 1,
    depth,
  })
  return data[0] || null
}

/**
 * Get a global singleton
 */
export async function getGlobal<T>(slug: string, depth = 1): Promise<T> {
  return fetchPayload<T>(`globals/${slug}?depth=${depth}`)
}

// Specific helpers for common queries

export const getDishes = (active = true) =>
  getAll('dishes', {
    where: active ? { activo: { equals: true } } : {},
    sort: 'orden',
    depth: 2,
  })

export const getDishesByCategory = (categoryId: string, active = true) =>
  getAll('dishes', {
    where: {
      categoria: { equals: categoryId },
      ...(active ? { activo: { equals: true } } : {}),
    },
    sort: 'orden',
    depth: 2,
  })

export const getCategories = (active = true) =>
  getAll('categories', {
    where: active ? { activa: { equals: true } } : {},
    sort: 'orden',
  })

export const getMenus = (active = true) =>
  getAll('menus', {
    where: active ? { activo: { equals: true } } : {},
    sort: 'orden',
    depth: 1,
  })

export const getSpaces = (active = true) =>
  getAll('spaces', {
    where: active ? { activo: { equals: true } } : {},
    sort: 'orden',
    depth: 1,
  })

export const getActiveBanners = (position?: string) => {
  const now = new Date().toISOString()
  const where: any = {
    activo: { equals: true },
    fechaInicio: { less_than_equal: now },
    fechaFin: { greater_than_equal: now },
  }

  if (position) {
    where.posicion = { equals: position }
  }

  return getAll('banners', {
    where,
    sort: '-prioridad',
    depth: 1,
  })
}

export const getHomepage = () => getGlobal('homepage', 2)
export const getSiteSettings = () => getGlobal('site-settings', 1)
