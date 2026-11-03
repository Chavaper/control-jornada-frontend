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
import { RouterLink } from '@/routes/components'
import { useRouter } from '@/routes/hooks'
import { regionPaths } from '@/routes/regionPaths'
import { saveRegion, regionById, updateRegion } from '@/services/rest/indexRegion'

import { REGION_DEFAULT_VALUES, RegionFormValues, RegionSchema } from './region'

interface Props {
  regionId?: string
}

export default function RegionNewEditForm({ regionId }: Props) {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(!!regionId)

  const methods = useForm<RegionFormValues>({
    resolver: yupResolver(RegionSchema),
    defaultValues: REGION_DEFAULT_VALUES
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = methods

  useEffect(() => {
    if (!regionId) return

    const getRegion = async () => {
      try {
        const region = await regionById(regionId)

        reset({
          id: region.id,
          countryId: region.countryId,
          name: region.name
        })
      } catch (error) {
        enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
        router.push(regionPaths.region.list)
      } finally {
        setLoading(false)
      }
    }

    getRegion()
  }, [regionId, reset, enqueueSnackbar, router])

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (regionId) {
        await updateRegion(regionId, data)
        enqueueSnackbar('Región actualizada')
      } else {
        await saveRegion(data)
        enqueueSnackbar('Región creada')
      }

      router.push(regionPaths.region.list)
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
            name="id"
            label="ID de la región"
            type="number"
            required
            disabled={!!regionId}
          />
          <RHFTextField name="name" label="Nombre" required />
          <RHFTextField
            name="countryId"
            label="ID del país"
            type="number"
            required
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              component={RouterLink}
              href={regionPaths.region.list}
              variant="outlined"
              color="inherit"
            >
              Cancelar
            </Button>

            <Button type="submit" variant="contained" loading={isSubmitting}>
              {regionId ? 'Guardar cambios' : 'Crear región'}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </FormProvider>
  )
}