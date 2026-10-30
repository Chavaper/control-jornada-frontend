export interface TaskModel {
  id: number
  title: string
  description: string
  completed: boolean
}

export type TaskRequest = Omit<TaskModel, 'id'>
