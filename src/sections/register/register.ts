import * as Yup from 'yup'

import { TableHeadItem } from '@/components/table'

export const TABLE_HEAD: TableHeadItem[] = [
  { id: 'id', label: 'ID' },
  { id: 'employeeId', label: 'Empleado' },
  { id: 'day', label: 'Fecha' },
  { id: 'startOfTheDay', label: 'Inicio de jornada' },
  { id: 'entry', label: 'Entrada' },
  { id: 'exit', label: 'Salida' },
  { id: '', label: 'Acciones', align: 'right' }
]

export const RegisterSchema = Yup.object({
  employeeId: Yup.number()
    .typeError('El empleado debe ser un número')
    .integer('Debe ser un número entero')
    .required('El empleado es obligatorio'),

  startOfTheDay: Yup.string().required(
    'La hora de inicio es obligatoria'
  ),

  entry: Yup.string().default(''),
  exit: Yup.string().default(''),
  breakTime: Yup.string().default(''),
  backToWork: Yup.string().default(''),

  day: Yup.string().required('La fecha es obligatoria'),

  justificationId: Yup.string().default('')
})

export type RegisterFormValues = Yup.InferType<typeof RegisterSchema>

export const REGISTER_DEFAULT_VALUES: RegisterFormValues = {
  employeeId: 0,
  startOfTheDay: '',
  entry: '',
  exit: '',
  breakTime: '',
  backToWork: '',
  day: '',
  justificationId: ''
}