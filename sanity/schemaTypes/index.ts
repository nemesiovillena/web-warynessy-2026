// Importar todos los schemas
import siteSettings from './siteSettings'
import homepage from './homepage'
import allergen from './allergen'
import category from './category'
import dish from './dish'
import menu from './menu'
import space from './space'
import experience from './experience'
import banner from './banner'

// Exportar array de todos los schemas
export const schemaTypes = [
  // Singletons (documentos únicos)
  siteSettings,
  homepage,

  // Alérgenos y Categorías
  allergen,
  category,

  // Carta y Menús
  dish,
  menu,

  // Espacios y Experiencias
  space,
  experience,

  // Banners
  banner,
]
