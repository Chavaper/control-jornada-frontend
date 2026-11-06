import { handleResponse, JSON_HEADERS } from '@/helpers/API'
import {
  JustificationTypeModel,
  JustificationTypeRequest
} from '@/model/justification-type.model'

const apiUrl = `${process.env.BASE_URL_API}/v1/template/justification-type`

export const allJustificationTypes = async (): Promise<
  JustificationTypeModel[]
> => {
  const response = await fetch(apiUrl)
  return handleResponse<JustificationTypeModel[]>(response)
}

export const justificationTypeById = async (
  id: number | string
): Promise<JustificationTypeModel> => {
  const response = await fetch(`${apiUrl}/${id}`)
  return handleResponse<JustificationTypeModel>(response)
}

export const createJustificationType = async (
  justType: JustificationTypeRequest
): Promise<JustificationTypeModel> => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(justType)
  })
  return handleResponse<JustificationTypeModel>(response)
}

export const updateJustificationType = async (
  justificationType: JustificationTypeModel
): Promise<JustificationTypeModel> => {
  const response = await fetch(apiUrl, {
    method: 'PUT',
    headers: JSON_HEADERS,
    body: JSON.stringify(justificationType)
  })
  return handleResponse<JustificationTypeModel>(response)
}

export const deleteJustificationType = async (
  id: number | string
): Promise<void> => {
  const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
  return handleResponse<void>(response)
}
