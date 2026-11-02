import { handleResponse, JSON_HEADERS } from '@/helpers/API'
import { CityModel, CityRequest } from '@/model'

const apiUrl = `${process.env.BASE_URL_API}/v1/template/city`

export const allCities = async (): Promise<CityModel[]> => {
  const response = await fetch(apiUrl)
  return handleResponse<CityModel[]>(response)
}

export const cityById = async (id: string | number): Promise<CityModel> => {
  const response = await fetch(`${apiUrl}/${id}`)
  return handleResponse<CityModel>(response)
}

export const saveCity = async (city: CityModel): Promise<CityModel> => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(city)
  })
  return handleResponse<CityModel>(response)
}

export const updateCity = async (
  id: string | number,
  city: CityRequest
): Promise<CityModel> => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: JSON_HEADERS,
    body: JSON.stringify(city)
  })
  return handleResponse<CityModel>(response)
}

export const deleteCity = async (id: string | number): Promise<void> => {
  const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
  return handleResponse<void>(response)
}