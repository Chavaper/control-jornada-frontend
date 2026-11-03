'use client'

import Container from '@mui/material/Container'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { paths } from '@/routes/paths'

import CommuneNewEditForm from '../commune-new-edit-form'

interface Props {
  id: string
}

export default function CommuneEditView({ id }: Props) {
  return (
    <Container maxWidth="md">
      <CustomBreadcrumbs
        heading="Editar comuna"
        links={[
          {
            name: 'Comunas',
            href: paths.justificationType.root
          },
          { name: `Comuna #${id}` }
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CommuneNewEditForm communeId={id} />
    </Container>
  )
}