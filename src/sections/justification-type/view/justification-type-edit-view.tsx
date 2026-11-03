'use client'

import Container from '@mui/material/Container'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { paths } from '@/routes/paths'

import JustificationTypeNewEditForm from '../justification-type-new-edit-form'

interface Props {
  id: string
}

export default function TaskEditView({ id }: Props) {
  return (
    <Container maxWidth="md">
      <CustomBreadcrumbs
        heading="Editar tipo"
        links={[
          {
            name: 'Tipos de justificación',
            href: paths.justificationType.root
          },
          { name: `Tipo #${id}` }
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <JustificationTypeNewEditForm justTypeId={id} />
    </Container>
  )
}
