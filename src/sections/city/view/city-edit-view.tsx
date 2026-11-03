'use client'

import Container from '@mui/material/Container'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { paths } from '@/routes/paths'

import CityNewEditForm from '../city-new-edit-form'

interface Props {
  id: string
}

export default function CityEditView({ id }: Props) {
  return (
    <Container maxWidth="md">
      <CustomBreadcrumbs
        heading="Editar ciudad"
        links={[
          { name: 'Ciudades', href: paths.city.root },
          { name: `Ciudad #${id}` }
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CityNewEditForm cityId={id} />
    </Container>
  )
}
