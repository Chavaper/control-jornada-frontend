'use client'

import Container from '@mui/material/Container'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { paths } from '@/routes/paths'

import ContractTypeNewEditForm from '../contract-type-new-edit-form'

export default function ContractTypeCreateView() {
  return (
    <Container maxWidth="md">
      <CustomBreadcrumbs
        heading="Crear tipo de contrato"
        links={[
          { name: 'Tipos de contrato', href: paths.contractType.list },
          { name: 'Agregar' }
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ContractTypeNewEditForm />
    </Container>
  )
}
