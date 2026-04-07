import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/de/blog',
        permanent: false,
      },
      {
        source: '/blog/:slug',
        destination: '/de/blog/:slug',
        permanent: false,
      },
      {
        source: '/studio',
        destination: '/admin',
        permanent: true,
      },
    ]
  },
}

export default withPayload(nextConfig)
