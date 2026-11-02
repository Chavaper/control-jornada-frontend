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
import { countryById, saveCountry, saveTask, taskById, updateCountry, updateTask } from '@/services/rest'
import { COUNTRY_DEFAULT_VALUES, CountryFormValues, CountrySchema } from './country'



interface Props {
  countryId?: string
}

export default function CountryNewEditForm({ countryId }: Props) {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(!!countryId)

  const methods = useForm<CountryFormValues>({
    resolver: yupResolver(CountrySchema),
    defaultValues: COUNTRY_DEFAULT_VALUES
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = methods

  useEffect(() => {
    if (!countryId) return

    const getCountry = async () => {
      try {
        const country = await countryById(countryId)
        reset({
          name: country.name,
          nationality: country.nationality ?? ''
        })
      } catch (error) {
        enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
        router.push(paths.country.list)
      } finally {
        setLoading(false)
      }
    }

    getCountry()
  }, [countryId, reset, enqueueSnackbar, router])

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (countryId) {
        await updateCountry(countryId, data)
        enqueueSnackbar('País actualizada')
      } else {
        await saveCountry(data)
        enqueueSnackbar('País creada')
      }
      router.push(paths.country.list)
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
            name="name"
            label="Nombre"
            multiline
            rows={3}
          />
          {/* <RHFSwitch name="completed" label="Completada" /> */}

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              component={RouterLink}
              href={paths.country.list}
              variant="outlined"
              color="inherit"
            >
              Cancelar
            </Button>
            <Button type="submit" variant="contained" loading={isSubmitting}>
              {countryId ? 'Guardar cambios' : 'Crear país'}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </FormProvider>
  )
}
