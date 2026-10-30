import * as Yup from 'yup'

import { TableHeadItem } from '@/components/table'

export const TABLE_HEAD: TableHeadItem[] = [
  { id: 'id', label: '#', width: 80 },
  { id: 'title', label: 'Título' },
  { id: 'description', label: 'Descripción', sortable: false },
  { id: 'completed', label: 'Estado', width: 140 },
  { id: '', width: 110, align: 'right' }
]

export const TaskSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required('El título es obligatorio')
    .max(100, 'Máximo 100 caracteres'),
  description: Yup.string().max(255, 'Máximo 255 caracteres').default(''),
  completed: Yup.boolean().default(false)
})

export type TaskFormValues = Yup.InferType<typeof TaskSchema>

export const TASK_DEFAULT_VALUES: TaskFormValues = {
  title: '',
  description: '',
  completed: false
}
