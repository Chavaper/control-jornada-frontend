
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import FormProvider, { RHFTextField } from '@/components/hook-form'
import type { JustificationTypeOption } from '@/model/justification.model'
import { useSnackbar } from '@/components/snackbar'
import { getErrorMessage } from '@/helpers/API'
import { RouterLink } from '@/routes/components'
import { useRouter } from '@/routes/hooks'
import {
  createJustification,
  getJustificationById,
  updateJustification,
  getJustificationTypes
} from '@/services/rest/justification/justificationService'

import { paths } from '@/routes/paths'

import {
  JUSTIFICATION_DEFAULT_VALUES,
  JustificationFormValues,
  JustificationSchema
} from './justification'

interface Props {
  justificationId?: string
}

export default function JustificationNewEditForm({ justificationId }: Props) {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(!!justificationId)
  const [types, setTypes] = useState<JustificationTypeOption[]>([])
  const [loadingTypes, setLoadingTypes] = useState(true)

  const methods = useForm<JustificationFormValues>({
    resolver: yupResolver(JustificationSchema),
    defaultValues: JUSTIFICATION_DEFAULT_VALUES
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = methods

  // Obtener justificación para edición
  useEffect(() => {
    if (!justificationId) return

    const getJustification = async () => {
      try {
        const justification = await getJustificationById(Number(justificationId))

        reset({
          justificationTypeId: justification.justificationTypeId,
          comments: justification.comments ?? '',
          attachment: justification.attachment ?? null
        })
      } catch (error) {
        enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
        router.push(paths.justification.list)
      } finally {
        setLoading(false)
      }
    }

    getJustification()
  }, [justificationId, reset, enqueueSnackbar, router])

  // Obtener tipos de justificación
  useEffect(() => {
    getJustificationTypes()
      .then(setTypes)
      .catch((error) => {
        enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
      })
      .finally(() => setLoadingTypes(false))
  }, [enqueueSnackbar])

  // Crear o actualizar justificación
  const onSubmit = handleSubmit(async (data) => {
    try {
      const request = {
        justificationTypeId: Number(data.justificationTypeId),
        comments: data.comments?.trim() ?? '',
        attachment: data.attachment ?? null
      }

      if (justificationId) {
        await updateJustification(Number(justificationId), request)
        enqueueSnackbar('Justificación actualizada')
      } else {
        await createJustification(request)
        enqueueSnackbar('Justificación creada')
      }

      router.push(paths.justification.list)
    } catch (error) {
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
    }
  })

  if (loading || loadingTypes) {
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
            name="justificationTypeId"
            label="Tipo de justificación"
            select
            required
          >
            <MenuItem value={0}>
              Selecciona un tipo
            </MenuItem>

            {types.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </RHFTextField>

          <RHFTextField
            name="comments"
            label="Comentarios"
            multiline
            rows={3}
          />

          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
          >
            <Button
              component={RouterLink}
              href={paths.justification.list}
              variant="outlined"
              color="inherit"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              variant="contained"
              loading={isSubmitting}
              disabled={!types.length}
            >
              {justificationId
                ? 'Guardar cambios'
                : 'Crear justificación'}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </FormProvider>
  )
}
