'use client'

import Container from '@mui/material/Container'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { paths } from '@/routes/paths'

import CountryNewEditForm from '../country-new-edit-form'

interface Props {
  id: string
}

export default function CountryEditView({ id }: Props) {
  return (
    <Container maxWidth="md">
      <CustomBreadcrumbs
        heading="Editar país"
        links={[
          { name: 'Países', href: paths.country.root },
          { name: `País #${id}` }
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CountryNewEditForm countryId={id} />
    </Container>
  )
}
