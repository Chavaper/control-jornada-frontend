'use client'

import Container from '@mui/material/Container'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { paths } from '@/routes/paths'

import CommuneNewEditForm from '../commune-new-edit-form'

export default function CommuneCreateView() {
  return (
    <Container maxWidth="md">
      <CustomBreadcrumbs
        heading="Crear comuna"
        links={[
          {
            name: 'Comunas',
            href: paths.justificationType.root
          },
          { name: 'Agregar' }
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CommuneNewEditForm />
    </Container>
  )
}
