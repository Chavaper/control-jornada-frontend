import * as Yup from 'yup'

import { TableHeadItem } from '@/components/table'

export const TABLE_HEAD: TableHeadItem[] = [
  { id: 'id', label: '#', width: 80 },
  { id: 'name', label: 'Nombre' },
  { id: 'siiCode', label: 'Código SII' },
  { id: 'tgrCode', label: 'Código TGR' },
  { id: 'city', label: 'Ciudad' },
  { id: 'region', label: 'Región' },
  { id: 'country', label: 'País' },
  { id: '', align: 'right' }
]

export const CommuneSchema = Yup.object({
    name: Yup.string()
            .trim()
            .required('El nombre es obligatorio')
            .max(255, 'Máximo 255 caracteres'),
    siiCode: Yup.string()
                .trim(),
    tgrCode: Yup.string()
                .trim(),
    cityId: Yup.number()
              .required()
              .integer()
              .positive("Debe ingresar una ciudad") // solo se puede llegar con el -1 default
})

export type CommuneFormValues = Yup.InferType<
  typeof CommuneSchema
>

export const COMMUNE_DEFAULT_VALUES: CommuneFormValues = {
  name: '',
  cityId: -1
}