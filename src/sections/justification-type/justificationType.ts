import * as Yup from 'yup'

import { TableHeadItem } from '@/components/table'

export const TABLE_HEAD: TableHeadItem[] = [
  { id: 'id', label: '#', width: 80 },
  { id: 'name', label: 'Nombre' },
  { id: '', align: 'right' }
]

export const JustificationTypeSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required('El nombre es obligatorio')
    .max(255, 'Máximo 255 caracteres')
})

export type JustificationTypeFormValues = Yup.InferType<
  typeof JustificationTypeSchema
>

export const JUSTIFICATION_TYPE_DEFAULT_VALUES: JustificationTypeFormValues = {
  name: ''
}
