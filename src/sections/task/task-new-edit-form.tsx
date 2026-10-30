import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import FormProvider, { RHFSwitch, RHFTextField } from '@/components/hook-form'
import { useSnackbar } from '@/components/snackbar'
import { getErrorMessage } from '@/helpers/API'
import { RouterLink } from '@/routes/components'
import { useRouter } from '@/routes/hooks'
import { paths } from '@/routes/paths'
import { saveTask, taskById, updateTask } from '@/services/rest'

import { TASK_DEFAULT_VALUES, TaskFormValues, TaskSchema } from './task'

interface Props {
  taskId?: string
}

export default function TaskNewEditForm({ taskId }: Props) {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(!!taskId)

  const methods = useForm<TaskFormValues>({
    resolver: yupResolver(TaskSchema),
    defaultValues: TASK_DEFAULT_VALUES
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = methods

  useEffect(() => {
    if (!taskId) return

    const getTask = async () => {
      try {
        const task = await taskById(taskId)
        reset({
          title: task.title,
          description: task.description ?? '',
          completed: task.completed
        })
      } catch (error) {
        enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
        router.push(paths.task.list)
      } finally {
        setLoading(false)
      }
    }

    getTask()
  }, [taskId, reset, enqueueSnackbar, router])

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (taskId) {
        await updateTask(taskId, data)
        enqueueSnackbar('Tarea actualizada')
      } else {
        await saveTask(data)
        enqueueSnackbar('Tarea creada')
      }
      router.push(paths.task.list)
    } catch (error) {
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
    }
  })

  if (loading) {
    return (
      <Stack alignItems="center" sx={{ py: 8 }}>
        <CircularProgress />
      </Stack>
    )
  }

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <RHFTextField name="title" label="Título" required />
          <RHFTextField
            name="description"
            label="Descripción"
            multiline
            rows={3}
          />
          <RHFSwitch name="completed" label="Completada" />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              component={RouterLink}
              href={paths.task.list}
              variant="outlined"
              color="inherit"
            >
              Cancelar
            </Button>
            <Button type="submit" variant="contained" loading={isSubmitting}>
              {taskId ? 'Guardar cambios' : 'Crear tarea'}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </FormProvider>
  )
}
