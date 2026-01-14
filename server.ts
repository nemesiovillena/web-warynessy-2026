import 'dotenv/config'
import express from 'express'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from './payload.config.js'

const app = express()
const PORT = process.env.PORT || 3000

const start = async () => {
  // Initialize Payload
  const payload = await getPayloadHMR({ config })

  // Payload has its own internal express handler
  // We just need to start the server

  app.listen(PORT, () => {
    console.log('')
    console.log('🎉 Payload CMS está corriendo!')
    console.log(`📊 Admin Panel: http://localhost:${PORT}/admin`)
    console.log(`🔌 API: http://localhost:${PORT}/api`)
    console.log('')
    console.log('💡 Próximo paso: Abre http://localhost:${PORT}/admin y crea tu usuario administrador')
    console.log('')
  })
}

start().catch((error) => {
  console.error('❌ Error starting Payload:', error)
  process.exit(1)
})
