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
import { paths } from '@/routes/paths'
import { allCities, cityById, saveCity, updateCity } from '@/services/rest'

import { CITY_DEFAULT_VALUES, CityFormValues, CitySchema } from './city'

interface Props {
  cityId?: string
}

export default function CityNewEditForm({ cityId }: Props) {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(!!cityId)

  const methods = useForm<CityFormValues>({
    resolver: yupResolver(CitySchema),
    defaultValues: CITY_DEFAULT_VALUES
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = methods

  useEffect(() => {
    if (!cityId) return

    const getCity = async () => {
      try {
        const city = await cityById(cityId)
        reset({ name: city.name, regionId: city.regionId })
      } catch (error) {
        enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
        router.push(paths.city.list)
      } finally {
        setLoading(false)
      }
    }

    getCity()
  }, [cityId, reset, enqueueSnackbar, router])

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (cityId) {
        await updateCity(cityId, data)
        enqueueSnackbar('Ciudad actualizada')
      } else {
        const cities = await allCities()
        const nextId = Math.max(0, ...cities.map((city) => city.id)) + 1
        await saveCity({ ...data, id: nextId })
        enqueueSnackbar('Ciudad creada')
      }
      router.push(paths.city.list)
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
          <RHFTextField name="name" label="Nombre" required />
          <RHFTextField
            name="regionId"
            label="ID de región"
            type="number"
            required
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              component={RouterLink}
              href={paths.city.list}
              variant="outlined"
              color="inherit"
            >
              Cancelar
            </Button>
            <Button type="submit" variant="contained" loading={isSubmitting}>
              {cityId ? 'Guardar cambios' : 'Crear ciudad'}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </FormProvider>
  )
}