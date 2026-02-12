import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { bunnyStorage } from '@seshuk/payload-storage-bunny'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Load .env file
dotenv.config({
  path: path.resolve(dirname, '.env'),
})

// Colecciones
import { Alergenos } from './src/payload/collections/Alergenos'
import { Categorias } from './src/payload/collections/Categorias'
import { Platos } from './src/payload/collections/Platos'
import { MenusGrupo } from './src/payload/collections/MenusGrupo'
import { Menus } from './src/payload/collections/Menus'
import { Espacios } from './src/payload/collections/Espacios'
import { Banners } from './src/payload/collections/Banners'
import { Archivos } from './src/payload/collections/Archivos'
import { Usuarios } from './src/payload/collections/Usuarios'
import { Paginas } from './src/payload/collections/Paginas'
import { Experiencias } from './src/payload/collections/Experiencias'

// Globals
import { PaginaInicio } from './src/payload/globals/PaginaInicio'
import { ConfiguracionSitio } from './src/payload/globals/ConfiguracionSitio'

export default buildConfig({
  // Configuración del panel de administración
  admin: {
    user: Usuarios.slug,
    meta: {
      titleSuffix: '- Warynessy CMS',
    },
  },

  // Colecciones (tipos de documentos)
  collections: [
    Usuarios,
    Archivos,
    Alergenos,
    Categorias,
    Platos,
    Menus,
    Espacios,
    Banners,
    Paginas,
    Experiencias,
    MenusGrupo,
  ],

  // Globals (singletons)
  globals: [
    PaginaInicio,
    ConfiguracionSitio,
  ],

  // Configuración del editor
  editor: lexicalEditor({}),

  // Configuración de base de datos
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: true, // Auto-sync schema on startup (creates tables)
  }),

  // Optimización de imágenes
  sharp,

  // Configuración de TypeScript
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload/payload-types.ts'),
  },

  // Clave secreta
  secret: process.env.PAYLOAD_SECRET || 'development-secret-key',

  // Configuración de Servidor y URLs
  // Nota: En producción Next.js detecta automáticamente la URL si no se especifica,
  // pero forzamos el uso de variables de entorno si existen.
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',

  // Configuración CORS - Permitir el propio servidor y el sitio público
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL,
    process.env.PUBLIC_SITE_URL,
  ].filter(Boolean) as string[],

  // Configuración CSRF
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL,
    process.env.PUBLIC_SITE_URL,
  ].filter(Boolean) as string[],

  plugins: [
    bunnyStorage({
      collections: {
        archivos: true,
      },
      storage: {
        apiKey: process.env.BUNNY_STORAGE_PASSWORD || '',
        zoneName: process.env.BUNNY_STORAGE_ZONE_NAME || '',
        hostname: process.env.PUBLIC_BUNNY_CDN_URL || 'warynessy.b-cdn.net',
      },
    }),
  ],
})

export const importMap = {}
