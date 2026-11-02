'use client'

import Container from '@mui/material/Container'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { regionPaths } from '@/routes/regionPaths'

import RegionNewEditForm from '../region-new-edit-form'

export default function RegionCreateView() {
  return (
    <Container maxWidth="md">
      <CustomBreadcrumbs
        heading="Crear región"
        links={[{ name: 'Regiones', href: regionPaths.region.root },{ name: 'Agregar' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <RegionNewEditForm />
    </Container>
  )
}