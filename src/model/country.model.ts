export interface CountryModel {
  id: number
  name: string
  nationality: string
  //completed: boolean
}

export type CountryRequest = Omit<CountryModel, 'id'>
