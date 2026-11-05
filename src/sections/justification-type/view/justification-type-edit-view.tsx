'use client'

import Container from '@mui/material/Container'

import JustificationTypeNewEditForm from '../justification-type-new-edit-form'

interface Props {
  id: string
}

export default function TaskEditView({ id }: Props) {
  return (
    <Container>
      <JustificationTypeNewEditForm justTypeId={id} />
    </Container>
  )
}
