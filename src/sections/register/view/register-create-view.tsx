'use client'

import Container from '@mui/material/Container'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { paths } from '@/routes/paths'

import RegisterNewEditForm from '../register-new-edit-form'

export default function RegisterCreateView() {
  return (
    <Container maxWidth="md">
      <CustomBreadcrumbs
        heading="Crear registro"
        links={[
          { name: 'Registros', href: paths.register.root },
          { name: 'Agregar' }
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <RegisterNewEditForm />
    </Container>
  )
}