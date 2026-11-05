import * as Yup from 'yup'

import { TableHeadItem } from '@/components/table'

export const TABLE_HEAD: TableHeadItem[] = [
  { id: 'id', label: '#', width: 80 },
  { id: 'justificationTypeName', label: 'Tipo' },
  { id: 'comments', label: 'Comentarios' },
  { id: 'attachment', label: 'Adjunto', width: 140, sortable: false },
  { id: '', width: 240, align: 'right' }
]

export const JustificationSchema = Yup.object({
  justificationTypeId: Yup.number()
    .typeError('Debes seleccionar un tipo')
    .integer('El tipo debe ser un número entero')
    .positive('Debes seleccionar un tipo')
    .required('Debes seleccionar un tipo'),
  comments: Yup.string().trim().max(200, 'Máximo 200 caracteres').defined(),
  attachment: Yup.string().nullable().defined()
})

export type JustificationFormValues = Yup.InferType<typeof JustificationSchema>

export const JUSTIFICATION_DEFAULT_VALUES: JustificationFormValues = {
  justificationTypeId: 0,
  comments: '',
  attachment: null
}
