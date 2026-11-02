import * as Yup from 'yup'

import { TableHeadItem } from '@/components/table'

export const TABLE_HEAD: TableHeadItem[] = [
  { id: 'id', label: '#', width: 80 },
  { id: 'code', label: 'Código' },
  { id: 'name', label: 'Nombre' },
  { id: 'address', label: 'Dirección', sortable: false },
  { id: 'communeId', label: 'Comuna', width: 110 },
  { id: '', width: 110, align: 'right' }
]

export const CompanySchema = Yup.object({
  communeId: Yup.number()
    .typeError('La comuna debe ser un número')
    .required('La comuna es obligatoria'),
  code: Yup.string()
    .trim()
    .required('El código es obligatorio')
    .max(20, 'Máximo 20 caracteres'),
  name: Yup.string()
    .trim()
    .required('El nombre es obligatorio')
    .max(200, 'Máximo 200 caracteres'),
  address: Yup.string()
    .trim()
    .required('La dirección es obligatoria')
    .max(500, 'Máximo 500 caracteres'),
  phone: Yup.string().max(20, 'Máximo 20 caracteres').default(''),
  alias: Yup.string().max(200, 'Máximo 200 caracteres').default(''),
  giro: Yup.string().max(500, 'Máximo 500 caracteres').default(''),
  email: Yup.string()
    .email('El correo no es válido')
    .max(500, 'Máximo 500 caracteres')
    .default(''),
  geolocation: Yup.boolean().default(false),
  selfie: Yup.boolean().default(false),
  lag: Yup.boolean().default(false)
})

export type CompanyFormValues = Yup.InferType<typeof CompanySchema>

export const COMPANY_DEFAULT_VALUES: Partial<CompanyFormValues> = {
  code: '',
  name: '',
  address: '',
  phone: '',
  alias: '',
  giro: '',
  email: '',
  geolocation: false,
  selfie: false,
  lag: false
}
