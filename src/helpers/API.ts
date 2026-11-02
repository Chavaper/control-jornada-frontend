export const JSON_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export class ApiError extends Error {
  status: number
  body: unknown

  constructor(status: number, message: string, body: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

const readBody = async (response: Response): Promise<unknown> => {
  const text = await response.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

export const handleResponse = async <T>(response: Response): Promise<T> => {
  const body = await readBody(response)

  if (!response.ok) {
    const message =
      typeof body === 'object' && body !== null && 'message' in body
        ? String((body as { message: unknown }).message)
        : `Error ${response.status}`
    throw new ApiError(response.status, message, body)
  }

  return body as T
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    const bodyMessage =
      typeof error.body === 'object' &&
      error.body !== null &&
      'message' in error.body
        ? String((error.body as { message: unknown }).message)
        : ''

    const fullMessage = `${error.message} ${bodyMessage}`.toLowerCase()

    if (
      fullMessage.includes('foreign key') ||
      fullMessage.includes('referential') ||
      fullMessage.includes('constraint') ||
      fullMessage.includes('violates')
    ) {
      return 'No se puede eliminar este tipo de contrato porque está siendo utilizado'
    }

    if (error.status === 404) return 'El registro no existe'
    if (error.status === 409) {
      return 'La operación no se puede completar porque existe un conflicto con los datos'
    }
    if (error.status >= 500) return 'Error en el servidor, intenta más tarde'
    return error.message
  }
  if (error instanceof TypeError) {
    return 'No se pudo conectar con el servidor'
  }
  return 'Ocurrió un error inesperado'
}
