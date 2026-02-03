import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Standalone output for Docker deployment
    output: 'standalone',
    experimental: {
        reactCompiler: false,
    },
    serverExternalPackages: ['@payloadcms/db-postgres', 'payload', 'sharp'],
    transpilePackages: ['@payloadcms/ui', '@payloadcms/next', '@payloadcms/richtext-lexical'],
    // Next.js usa src/app/ para Payload CMS
    // src/pages/ es usado por Astro, ignorar errores de TS de esos archivos
    typescript: {
        // Ignorar errores de TS porque src/pages/api/ es de Astro, no de Next.js
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
}

export default withPayload(nextConfig)
