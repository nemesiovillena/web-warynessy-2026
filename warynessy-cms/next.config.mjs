import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... otras configuraciones de Next.js
  experimental: {
    reactCompiler: false,
  },
}

export default withPayload(nextConfig)
