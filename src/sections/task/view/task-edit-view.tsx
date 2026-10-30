'use client'

import Container from '@mui/material/Container'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { paths } from '@/routes/paths'

import TaskNewEditForm from '../task-new-edit-form'

interface Props {
  id: string
}

export default function TaskEditView({ id }: Props) {
  return (
    <Container maxWidth="md">
      <CustomBreadcrumbs
        heading="Editar tarea"
        links={[
          { name: 'Tareas', href: paths.task.root },
          { name: `Tarea #${id}` }
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <TaskNewEditForm taskId={id} />
    </Container>
  )
}
