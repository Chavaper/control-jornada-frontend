export interface RegionModel {
  id: number
  countryId: number
  name: string
}

export type RegionRequest = Omit<RegionModel, 'id'>