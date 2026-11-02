'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import FormProvider, { RHFTextField } from '@/components/hook-form'
import { useSnackbar } from '@/components/snackbar'
import { getErrorMessage } from '@/helpers/API'
import { RegisterRequest } from '@/model'
import { RouterLink } from '@/routes/components'
import { useRouter } from '@/routes/hooks'
import { paths } from '@/routes/paths'
import {
  registerById,
  saveRegister,
  updateRegister
} from '@/services/rest/register/registerService'

import {
  REGISTER_DEFAULT_VALUES,
  RegisterFormValues,
  RegisterSchema
} from './register'

interface Props {
  registerId?: string
}

export default function RegisterNewEditForm({ registerId }: Props) {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(!!registerId)

  const methods = useForm<RegisterFormValues>({
    resolver: yupResolver(RegisterSchema),
    defaultValues: REGISTER_DEFAULT_VALUES
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = methods


  useEffect(() => {
    if (!registerId) return

    const getRegister = async () => {
      try {
        const register = await registerById(registerId)

        reset({
          employeeId: register.employeeId,
          startOfTheDay: register.startOfTheDay?.slice(0, 5) ?? '',
          entry: register.entry?.slice(0, 5) ?? '',
          exit: register.exit?.slice(0, 5) ?? '',
          breakTime: register.breakTime?.slice(0, 5) ?? '',
          backToWork: register.backToWork?.slice(0, 5) ?? '',
          day: register.day,
          justificationId: register.justificationId?.toString() ?? ''
        })
      } catch (error) {
        enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
        router.push(paths.register.list)
      } finally {
        setLoading(false)
      }
    }

    getRegister()
  }, [registerId, reset, enqueueSnackbar, router])

  const onSubmit = handleSubmit(async (data) => {
    try {
      const request: RegisterRequest = {
        employeeId: data.employeeId,
        startOfTheDay: data.startOfTheDay,
        entry: data.entry || null,
        exit: data.exit || null,
        breakTime: data.breakTime || null,
        backToWork: data.backToWork || null,
        day: data.day,
        justificationId: data.justificationId
          ? Number(data.justificationId)
          : null
      }

      if (registerId) {
        await updateRegister(registerId, request)
        enqueueSnackbar('Registro actualizado')
      } else {
        await saveRegister(request)
        enqueueSnackbar('Registro creado')
      }

      router.push(paths.register.list)
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
          <RHFTextField
            name="employeeId"
            label="ID del empleado"
            type="number"
            required
          />

          <RHFTextField
            name="day"
            label="Fecha"
            type="date"
            required
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <RHFTextField
            name="startOfTheDay"
            label="Inicio de jornada"
            type="time"
            required
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <RHFTextField
            name="entry"
            label="Hora de entrada"
            type="time"
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <RHFTextField
            name="exit"
            label="Hora de salida"
            type="time"
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <RHFTextField
            name="breakTime"
            label="Inicio del descanso"
            type="time"
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <RHFTextField
            name="backToWork"
            label="Regreso del descanso"
            type="time"
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <RHFTextField
            name="justificationId"
            label="ID de justificación"
            type="number"
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              component={RouterLink}
              href={paths.register.list}
              variant="outlined"
              color="inherit"
            >
              Cancelar
            </Button>

            <Button type="submit" variant="contained" loading={isSubmitting}>
              {registerId ? 'Guardar cambios' : 'Crear registro'}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </FormProvider>
  )
}