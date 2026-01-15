// Payload Local Client for Astro
// Uses Payload's local API directly (no HTTP server needed)

import { getPayload } from 'payload'
import config from '../../payload.config'

let payloadInstance: Awaited<ReturnType<typeof getPayload>> | null = null

async function getPayloadClient() {
  if (!payloadInstance) {
    payloadInstance = await getPayload({ config })
  }
  return payloadInstance
}

// ============================================
// COLLECTIONS
// ============================================

export async function getDishes(active = true) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'dishes',
    where: active ? { activo: { equals: true } } : {},
    sort: 'orden',
    depth: 2,
    limit: 100,
  })
  return result.docs
}

export async function getDishesByCategory(categoryId: string, active = true) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'dishes',
    where: {
      categoria: { equals: categoryId },
      ...(active ? { activo: { equals: true } } : {}),
    },
    sort: 'orden',
    depth: 2,
    limit: 100,
  })
  return result.docs
}

export async function getCategories(active = true) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'categories',
    where: active ? { activa: { equals: true } } : {},
    sort: 'orden',
    limit: 100,
  })
  return result.docs
}

export async function getAllergens() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'allergens',
    sort: 'orden',
    limit: 100,
  })
  return result.docs
}

export async function getMenus(active = true) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'menus',
    where: active ? { activo: { equals: true } } : {},
    sort: 'orden',
    depth: 1,
    limit: 100,
  })
  return result.docs
}

export async function getSpaces(active = true) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'spaces',
    where: active ? { activo: { equals: true } } : {},
    sort: 'orden',
    depth: 1,
    limit: 100,
  })
  return result.docs
}

export async function getExperiences(active = true) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'experiences',
    where: active ? { activo: { equals: true } } : {},
    sort: 'orden',
    depth: 1,
    limit: 100,
  })
  return result.docs
}

export async function getActiveBanners(position?: string) {
  const payload = await getPayloadClient()
  const now = new Date().toISOString()

  const where: any = {
    activo: { equals: true },
    fechaInicio: { less_than_equal: now },
    fechaFin: { greater_than_equal: now },
  }

  if (position) {
    where.posicion = { equals: position }
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

export async function getHomepage() {
  const payload = await getPayloadClient()
  return payload.findGlobal({
    slug: 'homepage',
    depth: 2,
  })
}

export async function getSiteSettings() {
  const payload = await getPayloadClient()
  return payload.findGlobal({
    slug: 'site-settings',
    depth: 1,
  })
}

// ============================================
// UTILITIES
// ============================================

export async function getCategoriesWithDishes() {
  const categories = await getCategories()
  const dishes = await getDishes()

  return categories.map((category: any) => ({
    ...category,
    dishes: dishes.filter((dish: any) =>
      dish.categoria?.id === category.id || dish.categoria === category.id
    ),
  }))
}

export async function getFeaturedDishes() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'dishes',
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
