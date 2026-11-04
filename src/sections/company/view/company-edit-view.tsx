'use client'

import Container from '@mui/material/Container'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { paths } from '@/routes/paths'

import CompanyNewEditForm from '../company-new-edit-form'

interface Props {
  id: string
}

export default function CompanyEditView({ id }: Props) {
  return (
    <Container maxWidth="md">
      <CustomBreadcrumbs
        heading="Editar empresa"
        links={[
          { name: 'Empresas', href: paths.company.root },
          { name: `Empresa #${id}` }
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CompanyNewEditForm companyId={id} />
    </Container>
  )
}
