import nextJest from 'next/jest.js'

// next/jest configura SWC, el alias "@/*" y las variables de next.config.ts
const createJestConfig = nextJest({ dir: './' })

/** @type {import('jest').Config} */
const config = {
  // Los services no renderizan nada: "node" trae fetch y Response nativos
  testEnvironment: 'node'
}

export default createJestConfig(config)
