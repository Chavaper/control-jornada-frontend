'use client'

import Container from '@mui/material/Container'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { paths } from '@/routes/paths'

import JustificationTypeNewEditForm from '../justification-type-new-edit-form'

export default function TaskCreateView() {
  return (
    <Container maxWidth="md">
      <CustomBreadcrumbs
        heading="Crear tipo de justificación"
        links={[
          {
            name: 'Tipos de justificación',
            href: paths.justificationType.root
          },
          { name: 'Agregar' }
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <JustificationTypeNewEditForm />
    </Container>
  )
}
