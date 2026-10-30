import type { NextConfig } from 'next'

type Stage = 'local' | 'dev' | 'stg' | 'pro'

const envs: Record<
  Stage,
  { BACKEND_URL: string; MOCK_URL: string; PUBLIC_ENV: string }
> = {
  local: {
    BACKEND_URL: 'http://localhost:8080',
    MOCK_URL: 'http://localhost:8090',
    PUBLIC_ENV: 'local'
  },
  dev: {
    BACKEND_URL: 'http://localhost:8080',
    MOCK_URL: 'http://localhost:8090',
    PUBLIC_ENV: 'dev'
  },
  stg: {
    BACKEND_URL: 'http://localhost:8080',
    MOCK_URL: 'http://localhost:8090',
    PUBLIC_ENV: 'qa'
  },
  pro: {
    BACKEND_URL: 'http://localhost:8080',
    MOCK_URL: 'http://localhost:8090',
    PUBLIC_ENV: 'prod'
  }
}

const stage = (process.env.STAGE as Stage) || 'local'
const current = envs[stage]

const nextConfig: NextConfig = {
  env: {
    BASE_URL_API: '/api/backend',
    BASE_URL_EXAMPLE: '/api/mock',
    PUBLIC_ENV: current.PUBLIC_ENV
  },
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: `${current.BACKEND_URL}/:path*`
      },
      {
        source: '/api/mock/:path*',
        destination: `${current.MOCK_URL}/:path*`
      }
    ]
  }
}

export default nextConfig
