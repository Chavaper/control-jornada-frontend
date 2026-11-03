'use client'

import Container from '@mui/material/Container'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { paths } from '@/routes/paths'

import CityNewEditForm from '../city-new-edit-form'

export default function CityCreateView() {
  return (
    <Container maxWidth="md">
      <CustomBreadcrumbs
        heading="Crear ciudad"
        links={[
          { name: 'Ciudades', href: paths.city.root },
          { name: 'Agregar' }
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CityNewEditForm />
    </Container>
  )
}
