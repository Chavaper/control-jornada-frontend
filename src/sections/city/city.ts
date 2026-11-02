import * as Yup from 'yup'

import { TableHeadItem } from '@/components/table'

export const TABLE_HEAD: TableHeadItem[] = [
  { id: 'id', label: '#', width: 80 },
  { id: 'name', label: 'Nombre' },
  { id: 'regionId', label: 'Región' },
  { id: '', width: 110, align: 'right' }
]

export const CitySchema = Yup.object({
  id: Yup.number()
    .typeError('El ID debe ser un número')
    .required('El ID es obligatorio')
    .integer('El ID debe ser un número entero')
    .positive('El ID debe ser mayor que 0'),
  name: Yup.string()
    .trim()
    .required('El nombre es obligatorio')
    .max(200, 'Máximo 200 caracteres'),
  regionId: Yup.number()
    .typeError('La región debe ser un número')
    .required('La región es obligatoria')
})

export type CityFormValues = Yup.InferType<typeof CitySchema>

export const CITY_DEFAULT_VALUES: Partial<CityFormValues> = {
  name: ''
}
