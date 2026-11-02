'use client'

import Container from '@mui/material/Container'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { paths } from '@/routes/paths'

import RegisterNewEditForm from '../register-new-edit-form'

interface Props {
  id: string
}

export default function RegisterEditView({ id }: Props) {
  return (
    <Container maxWidth="md">
      <CustomBreadcrumbs
        heading="Editar registro"
        links={[
          { name: 'Registros', href: paths.register.root },
          { name: `Registro #${id}` }
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <RegisterNewEditForm registerId={id} />
    </Container>
  )
}