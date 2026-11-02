import { handleResponse, JSON_HEADERS } from '@/helpers/API'
import { RegisterModel, RegisterRequest } from '@/model'

const apiUrl = `${process.env.BASE_URL_API}/v1/template/registers`


export const allRegisters = async (): Promise<RegisterModel[]> => {
  const response = await fetch(apiUrl)
  return handleResponse<RegisterModel[]>(response)
}


export const registerById = async (
  id: string | number
): Promise<RegisterModel> => {
  const response = await fetch(`${apiUrl}/${id}`)
  return handleResponse<RegisterModel>(response)
}


export const saveRegister = async (
  register: RegisterRequest
): Promise<RegisterModel> => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(register)
  })

  return handleResponse<RegisterModel>(response)
}


export const updateRegister = async (
  id: string | number,
  register: RegisterRequest
): Promise<RegisterModel> => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: JSON_HEADERS,
    body: JSON.stringify(register)
  })

  return handleResponse<RegisterModel>(response)
}


export const deleteRegister = async (
  id: string | number
): Promise<void> => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  })

  return handleResponse<void>(response)
}