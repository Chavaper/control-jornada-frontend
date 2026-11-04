export interface CompanyModel {
  id: number
  communeId: number
  code: string
  name: string
  address: string
  phone: string | null
  alias: string | null
  giro: string | null
  email: string | null
  geolocation: boolean
  selfie: boolean
  lag: boolean
}

export type CompanyRequest = Omit<CompanyModel, 'id'>
