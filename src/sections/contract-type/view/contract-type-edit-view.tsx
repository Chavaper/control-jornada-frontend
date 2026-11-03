'use client'

import Container from '@mui/material/Container'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { paths } from '@/routes/paths'

import ContractTypeNewEditForm from '../contract-type-new-edit-form'

interface Props {
  id: string
}

export default function ContractTypeEditView({ id }: Props) {
  return (
    <Container maxWidth="md">
      <CustomBreadcrumbs
        heading="Editar tipo de contrato"
        links={[
          { name: 'Tipos de contrato', href: paths.contractType.list },
          { name: `Tipo #${id}` }
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ContractTypeNewEditForm contractTypeId={id} />
    </Container>
  )
}
