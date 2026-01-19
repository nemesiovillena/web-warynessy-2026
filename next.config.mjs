import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Your Next.js config here
    experimental: {
        reactCompiler: false,
    },
    serverExternalPackages: ['@payloadcms/db-postgres', 'payload', 'sharp'],
    transpilePackages: ['@payloadcms/ui', '@payloadcms/next', '@payloadcms/richtext-lexical'],
}

export default withPayload(nextConfig)
