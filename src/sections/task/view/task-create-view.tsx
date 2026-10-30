'use client'

import Container from '@mui/material/Container'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { paths } from '@/routes/paths'

import TaskNewEditForm from '../task-new-edit-form'

export default function TaskCreateView() {
  return (
    <Container maxWidth="md">
      <CustomBreadcrumbs
        heading="Crear tarea"
        links={[{ name: 'Tareas', href: paths.task.root }, { name: 'Agregar' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <TaskNewEditForm />
    </Container>
  )
}
