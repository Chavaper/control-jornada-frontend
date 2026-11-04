export interface CompanyModel {
  id: number
  commune: {
    id: number
    name: string
  }
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

export type CompanyRequest = Omit<CompanyModel, 'id' | 'commune'> & {
  commune: {
    id: number
  }
}
