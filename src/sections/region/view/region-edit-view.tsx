'use client'

import Container from '@mui/material/Container'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { regionPaths } from '@/routes/regionPaths'

import RegionNewEditForm from '../region-new-edit-form'

interface Props {
  id: string
}

export default function RegionEditView({ id }: Props) {
  return (
    <Container maxWidth="md">
      <CustomBreadcrumbs
        heading="Editar región"
        links={[
          { name: 'Regiones', href: regionPaths.region.root },
          { name: `Región #${id}` }
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <RegionNewEditForm regionId={id} />
    </Container>
  )
}