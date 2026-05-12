import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'blogtec.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/studio',
        destination: '/admin',
        permanent: true,
      },
    ]
  },
}

export default withPayload(nextConfig)
