export interface CityModel {
  id: number
  name: string
  region: {
    id: number
    name: string
  }
}

export interface CityRequest {
  name: string
  region: {
    id: number
  }
}
