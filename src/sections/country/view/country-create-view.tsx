'use client'

import Container from '@mui/material/Container'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { paths } from '@/routes/paths'

import CountryNewEditForm from '../country-new-edit-form'

export default function CountryCreateView() {
  return (
    <Container maxWidth="md">
      <CustomBreadcrumbs
        heading="Crear país"
        links={[{ name: 'Países', href: paths.country.root }, { name: 'Agregar' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CountryNewEditForm />
    </Container>
  )
}
