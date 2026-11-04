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
import { companyById, saveCompany, updateCompany } from '@/services/rest'

import {
  COMPANY_DEFAULT_VALUES,
  CompanyFormValues,
  CompanySchema
} from './company'

interface Props {
  companyId?: string
}

export default function CompanyNewEditForm({ companyId }: Props) {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(!!companyId)

  const methods = useForm<CompanyFormValues>({
    resolver: yupResolver(CompanySchema),
    defaultValues: COMPANY_DEFAULT_VALUES
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = methods

  useEffect(() => {
    if (!companyId) return

    const getCompany = async () => {
      try {
        const company = await companyById(companyId)
        reset({
          communeId: company.communeId,
          code: company.code,
          name: company.name,
          address: company.address,
          phone: company.phone ?? '',
          alias: company.alias ?? '',
          giro: company.giro ?? '',
          email: company.email ?? '',
          geolocation: company.geolocation,
          selfie: company.selfie,
          lag: company.lag
        })
      } catch (error) {
        enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
        router.push(paths.company.list)
      } finally {
        setLoading(false)
      }
    }

    getCompany()
  }, [companyId, reset, enqueueSnackbar, router])

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (companyId) {
        await updateCompany(companyId, data)
        enqueueSnackbar('Empresa actualizada')
      } else {
        await saveCompany(data)
        enqueueSnackbar('Empresa creada')
      }
      router.push(paths.company.list)
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
          <RHFTextField name="code" label="Código" required />
          <RHFTextField name="name" label="Nombre" required />
          <RHFTextField name="address" label="Dirección" required />
          <RHFTextField
            name="communeId"
            label="ID de comuna"
            type="number"
            required
          />
          <RHFTextField name="phone" label="Teléfono" />
          <RHFTextField name="alias" label="Alias" />
          <RHFTextField name="giro" label="Giro" />
          <RHFTextField name="email" label="Correo" type="email" />

          <Stack direction="row" spacing={3} flexWrap="wrap">
            <RHFSwitch name="geolocation" label="Geolocalización" />
            <RHFSwitch name="selfie" label="Selfie" />
            <RHFSwitch name="lag" label="Lag" />
          </Stack>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              component={RouterLink}
              href={paths.company.list}
              variant="outlined"
              color="inherit"
            >
              Cancelar
            </Button>
            <Button type="submit" variant="contained" loading={isSubmitting}>
              {companyId ? 'Guardar cambios' : 'Crear empresa'}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </FormProvider>
  )
}
