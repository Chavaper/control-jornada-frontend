import type {
  JustificationModel,
  JustificationRequest,
  JustificationTypeOption
} from '@/model/justification.model'

const BASE_URL = process.env.BASE_URL_API ?? '/api/backend'

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${BASE_URL.replace(/\/$/, '')}${endpoint}`
  const response = await fetch(url, options)

  if (!response.ok) {
    const errorBody = await response.text()
    let message = errorBody.trim()

    if (message) {
      try {
        const parsed: unknown = JSON.parse(message)
        if (parsed && typeof parsed === 'object') {
          const details = parsed as Record<string, unknown>
          message =
            (typeof details.message === 'string' && details.message) ||
            (typeof details.error === 'string' && details.error) ||
            message
        }
      } catch {
        // La respuesta no es JSON: se conserva el texto original.
      }
    }

    throw new Error(
      `Error HTTP ${response.status} (${options?.method ?? 'GET'} ${endpoint})${
        message ? `: ${message}` : ''
      }`
    )
  }

  if (response.status === 204) {
    return undefined as T
  }

  const body = await response.text()
  if (!body.trim()) {
    return undefined as T
  }

  return JSON.parse(body) as T
}

// Obtener los tipos de justificación
export const getJustificationTypes = async (): Promise<JustificationTypeOption[]> => {
  return request<JustificationTypeOption[]>('/v1/template/justification-type')
}

// Obtener una justificación por su ID
export const getJustificationById = async (
  id: number
): Promise<JustificationModel> => {
  return request<JustificationModel>(`/v1/template/justification/${id}`)
}

// Crear una justificación
export const createJustification = async (
  data: JustificationRequest
): Promise<JustificationModel> => {
  return request<JustificationModel>('/v1/template/justification', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}

// Actualizar una justificación existente
export const updateJustification = async (
  id: number,
  data: JustificationRequest
): Promise<JustificationModel> => {
  return request<JustificationModel>(`/v1/template/justification/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}