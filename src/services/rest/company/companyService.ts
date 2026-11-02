import { handleResponse, JSON_HEADERS } from '@/helpers/API'
import { CompanyModel, CompanyRequest } from '@/model'

const apiUrl = `${process.env.BASE_URL_API}/v1/template/company`

export const allCompanies = async (): Promise<CompanyModel[]> => {
  const response = await fetch(apiUrl)
  return handleResponse<CompanyModel[]>(response)
}

export const companyById = async (
  id: string | number
): Promise<CompanyModel> => {
  const response = await fetch(`${apiUrl}/${id}`)
  return handleResponse<CompanyModel>(response)
}

export const saveCompany = async (
  company: CompanyRequest
): Promise<CompanyModel> => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(company)
  })
  return handleResponse<CompanyModel>(response)
}

export const updateCompany = async (
  id: string | number,
  company: CompanyRequest
): Promise<CompanyModel> => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: JSON_HEADERS,
    body: JSON.stringify(company)
  })
  return handleResponse<CompanyModel>(response)
}

export const deleteCompany = async (id: string | number): Promise<void> => {
  const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
  return handleResponse<void>(response)
}
