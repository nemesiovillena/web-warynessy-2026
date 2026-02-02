import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import next from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dev = process.env.NODE_ENV !== 'production'
const PORT = parseInt(process.env.PORT || '3000', 10)

async function start() {
  const app = express()

  // Inicializar Next.js para Payload CMS
  const nextApp = next({ dev, dir: process.cwd() })
  await nextApp.prepare()
  const nextHandler = nextApp.getRequestHandler()

  // Servir archivos estáticos del cliente Astro
  app.use('/_astro', express.static(path.join(__dirname, 'dist/client/_astro')))
  app.use(express.static(path.join(__dirname, 'dist/client'), { index: false }))

  // Rutas de Payload/Next.js (admin y API)
  app.all('/admin', (req, res) => nextHandler(req, res))
  app.all('/admin/*', (req, res) => nextHandler(req, res))
  app.all('/api/*', (req, res) => nextHandler(req, res))
  app.all('/_next/*', (req, res) => nextHandler(req, res))

  // Importar handler de Astro SSR dinámicamente
  const { handler: astroHandler } = await import('./dist/server/entry.mjs')

  // Resto de rutas → Astro SSR
  app.use((req, res, next) => {
    astroHandler(req, res, next)
  })

  const server = createServer(app)
  server.listen(PORT, '0.0.0.0', () => {
    console.log('')
    console.log('🚀 Servidor unificado corriendo!')
    console.log(`📊 Payload Admin: http://localhost:${PORT}/admin`)
    console.log(`🔌 Payload API: http://localhost:${PORT}/api`)
    console.log(`🌐 Astro Frontend: http://localhost:${PORT}/`)
    console.log('')
  })
}

start().catch((error) => {
  console.error('❌ Error starting server:', error)
  process.exit(1)
})
