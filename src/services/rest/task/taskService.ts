import { handleResponse, JSON_HEADERS } from '@/helpers/API'
import { TaskModel, TaskRequest } from '@/model'

const apiUrl = `${process.env.BASE_URL_EXAMPLE}/tasks`

export const allTasks = async (): Promise<TaskModel[]> => {
  const response = await fetch(apiUrl)
  return handleResponse<TaskModel[]>(response)
}

export const taskById = async (id: string | number): Promise<TaskModel> => {
  const response = await fetch(`${apiUrl}/${id}`)
  return handleResponse<TaskModel>(response)
}

export const saveTask = async (task: TaskRequest): Promise<TaskModel> => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(task)
  })
  return handleResponse<TaskModel>(response)
}

export const updateTask = async (
  id: string | number,
  task: TaskRequest
): Promise<TaskModel> => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: JSON_HEADERS,
    body: JSON.stringify(task)
  })
  return handleResponse<TaskModel>(response)
}

export const deleteTask = async (id: string | number): Promise<void> => {
  const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
  return handleResponse<void>(response)
}
