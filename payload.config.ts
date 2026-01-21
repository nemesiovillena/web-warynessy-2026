import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

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
import { Menus } from './src/payload/collections/Menus'
import { Espacios } from './src/payload/collections/Espacios'
import { Experiencias } from './src/payload/collections/Experiencias'
import { Banners } from './src/payload/collections/Banners'
import { Archivos } from './src/payload/collections/Archivos'
import { Usuarios } from './src/payload/collections/Usuarios'
import { Paginas } from './src/payload/collections/Paginas'

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
    Experiencias,
    Banners,
    Paginas,
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
  }),

  // Optimización de imágenes
  sharp,

  // Configuración de TypeScript
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload/payload-types.ts'),
  },

  // Clave secreta
  secret: process.env.PAYLOAD_SECRET || '',

  // URL del servidor
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',

  // Configuración CORS
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
    process.env.PUBLIC_SITE_URL || 'http://localhost:4321',
  ].filter(Boolean),

  // Configuración CSRF
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
    process.env.PUBLIC_SITE_URL || 'http://localhost:4321',
  ].filter(Boolean),
})
