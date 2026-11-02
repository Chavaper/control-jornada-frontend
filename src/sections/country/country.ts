import * as Yup from 'yup'

import { TableHeadItem } from '@/components/table'

export const TABLE_HEAD: TableHeadItem[] = [
  { id: 'id', label: '#', width: 80 },
  { id: 'name', label: 'Nombre' },
  { id: 'nationality', label: 'Nationality', sortable: false },
  //{ id: 'completed', label: 'Activo', width: 140 },
  { id: '', width: 110, align: 'right' }
]

export const CountrySchema = Yup.object({
  name: Yup.string()
    .trim()
    .required('El nombre del país es obligatorio')
    .max(100, 'Máximo 100 caracteres'),
  nationality: Yup.string().max(255, 'Máximo 255 caracteres').default('')
  //completed: Yup.boolean().default(false)
})

export type CountryFormValues = Yup.InferType<typeof CountrySchema>

export const COUNTRY_DEFAULT_VALUES: CountryFormValues = {
  name: '',
  nationality: ''
  //completed: false
}
