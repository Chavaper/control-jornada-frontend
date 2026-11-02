import { JSON_HEADERS, request } from '@/helpers/API'
import { BranchModel, BranchRequest, CompanyOption, CommuneOption } from '@/model'

const apiUrl = `${process.env.BASE_URL_API}/v1/template/branch`
const companyApiUrl = `${process.env.BASE_URL_API}/v1/template/company`
const communeApiUrl = `${process.env.BASE_URL_API}/v1/template/commune`

export const allCompanies = async (): Promise<CompanyOption[]> => {
  return request<CompanyOption[]>(companyApiUrl)
}

export const allCommunes = async (): Promise<CommuneOption[]> => {
  return request<CommuneOption[]>(communeApiUrl)
}

export const allBranches = async (): Promise<BranchModel[]> => {
  return request<BranchModel[]>(apiUrl)
}

export const branchById = async (id: string | number): Promise<BranchModel> => {
  return request<BranchModel>(`${apiUrl}/${id}`)
}

export const saveBranch = async (
  branch: BranchRequest | BranchModel
): Promise<BranchModel> => {
  return request<BranchModel>(apiUrl, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(branch)
  })
}

export const deleteBranch = async (id: string | number): Promise<void> => {
  return request<void>(`${apiUrl}/${id}`, { method: 'DELETE' })
}
