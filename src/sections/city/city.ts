import * as Yup from 'yup'

import { TableHeadItem } from '@/components/table'

export const TABLE_HEAD: TableHeadItem[] = [
  { id: 'id', label: '#', width: 80 },
  { id: 'name', label: 'Nombre' },
  { id: 'region', label: 'Región', sortable: false },
  { id: '', width: 110, align: 'right' }
]

export const CitySchema = Yup.object({
  name: Yup.string()
    .trim()
    .required('El nombre es obligatorio')
    .max(200, 'Máximo 200 caracteres'),
  regionId: Yup.number()
    .typeError('Selecciona una región')
    .required('Selecciona una región')
})

export type CityFormValues = Yup.InferType<typeof CitySchema>

export const CITY_DEFAULT_VALUES: Partial<CityFormValues> = {
  name: ''
}
