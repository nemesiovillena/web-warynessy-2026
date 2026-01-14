import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Allergens } from './src/payload/collections/Allergens'
import { Categories } from './src/payload/collections/Categories'
import { Dishes } from './src/payload/collections/Dishes'
import { Menus } from './src/payload/collections/Menus'
import { Spaces } from './src/payload/collections/Spaces'
import { Experiences } from './src/payload/collections/Experiences'
import { Banners } from './src/payload/collections/Banners'
import { Media } from './src/payload/collections/Media'
import { Users } from './src/payload/collections/Users'

// Globals
import { Homepage } from './src/payload/globals/Homepage'
import { SiteSettings } from './src/payload/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Admin panel configuration
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Warynessy CMS',
      favicon: '/favicon.ico',
    },
  },

  // Collections (document types)
  collections: [
    Users,
    Media,
    Allergens,
    Categories,
    Dishes,
    Menus,
    Spaces,
    Experiences,
    Banners,
  ],

  // Globals (singletons)
  globals: [
    Homepage,
    SiteSettings,
  ],

  // Editor configuration
  editor: lexicalEditor({}),

  // Database configuration
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),

  // Image optimization
  sharp,

  // Secret key
  secret: process.env.PAYLOAD_SECRET || '',

  // TypeScript configuration
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload/payload-types.ts'),
  },

  // Server URL
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',

  // CORS configuration
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
    process.env.PUBLIC_SITE_URL || 'http://localhost:4321',
  ].filter(Boolean),

  // CSRF configuration
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
    process.env.PUBLIC_SITE_URL || 'http://localhost:4321',
  ].filter(Boolean),
})
