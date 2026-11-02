import * as Yup from 'yup'

import { TableHeadItem } from '@/components/table'

export const TABLE_HEAD: TableHeadItem[] = [
  { id: 'id', label: '#', width: 80 },
  { id: 'countryId', label: 'ID_Pais', width: 80 },
  { id: 'name', label: 'Nombre' },
  { id: '', width: 110, align: 'right' }
]

export const RegionSchema = Yup.object({
  id: Yup.number()
    .typeError('El ID debe ser un número')
    .integer('El ID debe ser un número entero')
    .positive('El ID debe ser mayor que cero')
    .required('El ID es obligatorio'),
  countryId: Yup.number()
    .typeError('El id del país debe ser un número')
    .integer('El país debe ser un número entero')
    .required('El país es obligatorio'),
  name: Yup.string()
    .trim()
    .required('El nombre es obligatorio')
    .max(100, 'Máximo 100 caracteres')
})

export type RegionFormValues = Yup.InferType<typeof RegionSchema>

export const REGION_DEFAULT_VALUES: RegionFormValues = {
  id: 0,
  countryId: 0,
  name: ''
}