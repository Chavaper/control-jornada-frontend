export interface CityModel {
  id: number
  name: string
  regionId: number
}

export type CityRequest = Omit<CityModel, 'id'>
