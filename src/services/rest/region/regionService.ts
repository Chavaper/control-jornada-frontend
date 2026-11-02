import { handleResponse, JSON_HEADERS } from '@/helpers/API'
import { RegionModel, RegionRequest } from '@/model/region.model'

const apiUrl = `${process.env.BASE_URL_API}/v1/template/region`

export const allRegions = async (): Promise<RegionModel[]> => {
  const response = await fetch(apiUrl)
  return handleResponse<RegionModel[]>(response)
}

export const regionById = async (id: string | number): Promise<RegionModel> => {
  const response = await fetch(`${apiUrl}/${id}`)
  return handleResponse<RegionModel>(response)
}

export const saveRegion = async (region: RegionRequest): Promise<RegionModel> => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(region)
  })
  return handleResponse<RegionModel>(response)
}

export const updateRegion = async (id: string | number,region: RegionRequest): Promise<RegionModel> => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: JSON_HEADERS,
    body: JSON.stringify(region)
  })
  return handleResponse<RegionModel>(response)
}

export const deleteRegion = async (id: string | number): Promise<void> => {
  const response = await fetch(`${apiUrl}/${id}`, {method: 'DELETE'})
  return handleResponse<void>(response)
}