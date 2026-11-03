export interface CommuneModel {
  id: number
  cityId: number
  name: string
  siiCode?: string
  tgrCode?: string
  city: {
    id: number
    name: string
  }
  region: {
    id: number
    name: string
  }
  country: {
    id: number
    name: string
  }
}

export type CommuneRequestCreate = Omit<CommuneModel, 'id' | 'city' | 'region' | 'country'>
export type CommuneRequestUpdate = Omit<CommuneModel, 'city' | 'region' | 'country'>
export type CommuneWriteResponse = CommuneRequestUpdate