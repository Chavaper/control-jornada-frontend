import { handleResponse, JSON_HEADERS } from '@/helpers/API'
import {
  ContractTypeModel,
  ContractTypeRequest
} from '@/model'

const apiUrl = `${process.env.BASE_URL_API}/v1/template/contract-type`

export const allContractTypes = async (): Promise<ContractTypeModel[]> => {
  const response = await fetch(apiUrl)

  return handleResponse<ContractTypeModel[]>(response)
}

export const contractTypeById = async (
  id: string | number
): Promise<ContractTypeModel> => {
  const response = await fetch(`${apiUrl}/${id}`)

  return handleResponse<ContractTypeModel>(response)
}

export const saveContractType = async (
  contractType: ContractTypeRequest | ContractTypeModel
): Promise<ContractTypeModel> => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(contractType)
  })

  return handleResponse<ContractTypeModel>(response)
}

export const deleteContractType = async (
  id: string | number
): Promise<void> => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  })

  return handleResponse<void>(response)
}