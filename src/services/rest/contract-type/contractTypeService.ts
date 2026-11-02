import { JSON_HEADERS, request } from '@/helpers/API'
import {
  ContractTypeModel,
  ContractTypeRequest
} from '@/model'

const apiUrl = `${process.env.BASE_URL_API}/v1/template/contract-type`

export const allContractTypes = async (): Promise<ContractTypeModel[]> => {
  return request<ContractTypeModel[]>(apiUrl)
}

/**
 * El esquema actual de la base de datos no genera el id automáticamente.
 * Para crear desde el frontend enviamos el siguiente id disponible.
 */
export const nextContractTypeId = async (): Promise<number> => {
  const contractTypes = await allContractTypes()

  return contractTypes.reduce(
    (maxId, contractType) => Math.max(maxId, contractType.id),
    0
  ) + 1
}

export const contractTypeById = async (
  id: string | number
): Promise<ContractTypeModel> => {
  return request<ContractTypeModel>(`${apiUrl}/${id}`)
}

export const saveContractType = async (
  contractType: ContractTypeRequest | ContractTypeModel
): Promise<ContractTypeModel> => {
  return request<ContractTypeModel>(apiUrl, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(contractType)
  })
}

export const deleteContractType = async (
  id: string | number
): Promise<void> => {
  return request<void>(`${apiUrl}/${id}`, {
    method: 'DELETE'
  })
}
