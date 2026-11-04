'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import FormProvider, { RHFTextField } from '@/components/hook-form'
import { useSnackbar } from '@/components/snackbar'
import { getErrorMessage } from '@/helpers/API'
import { RouterLink } from '@/routes/components'
import { useRouter } from '@/routes/hooks'
import { paths } from '@/routes/paths'

import {
  BranchModel,
  CommuneModel,
  ContractTypeModel,
  CountryModel,
  EmployeeRequest,
  GenderModel,
  JobSchedulerModel,
  JobTypeModel,
  MaritalStatusModel
} from '@/model'
import {
  employeeById,
  saveEmployee,
  updateEmployee,
  mockGenders,
  mockMaritalStatus,
  mockContractTypes,
  mockJobTypes,
  mockCountries,
  mockBranches,
  mockCommunes,
  mockJobSchedulers
} from '@/services/rest/employee/employee'

import EntitySelectField from '@/components/entity-select-field'
import { EMPLOYEE_DEFAULT_VALUES, EmployeeFormValues, EmployeeSchema } from './employee'

interface Props {
  employeeId?: string
}

interface Catalogs {
  genders: GenderModel[]
  maritalStatus: MaritalStatusModel[]
  contractTypes: ContractTypeModel[]
  jobTypes: JobTypeModel[]
  countries: CountryModel[]
  branches: BranchModel[]
  communes: Pick<CommuneModel, 'id' | 'name'>[]
  jobSchedulers: JobSchedulerModel[]
}

export default function EmployeeNewEditForm({ employeeId }: Props) {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(true)
  const [catalogs, setCatalogs] = useState<Catalogs | null>(null)

  const methods = useForm<EmployeeFormValues>({
    resolver: yupResolver(EmployeeSchema) as never,
    defaultValues: EMPLOYEE_DEFAULT_VALUES
  })

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = methods

  useEffect(() => {
    const load = async () => {
      try {
        const [genders, maritalStatus, contractTypes, jobTypes,
          countries, branches, communes, jobSchedulers] =
          await Promise.all([
            mockGenders(), mockMaritalStatus(), mockContractTypes(), mockJobTypes(),
            mockCountries(), mockBranches(), mockCommunes(), mockJobSchedulers()
          ])

        setCatalogs({
          genders, maritalStatus, contractTypes,
          jobTypes, countries, branches, communes, jobSchedulers
        })

        if (employeeId) {
          const employee = await employeeById(employeeId)
          reset({
            code: employee.code ?? '',
            name: employee.name ?? '',
            lastName: employee.lastName ?? '',
            motherLastName: employee.motherLastName ?? '',
            branch: employee.branch ?? null,
            jobScheduler: employee.jobScheduler ?? null,
            commune: employee.commune ?? null,
            country: employee.country ?? null,
            gender: employee.gender ?? null,
            maritalStatus: employee.maritalStatus ?? null,
            contractType: employee.contractType ?? null,
            jobType: employee.jobType ?? null
          })
        }
      } catch (error) {
        enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
        router.push(paths.employee.list)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [employeeId, reset, enqueueSnackbar, router])

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload: EmployeeRequest = {
        code: data.code,
        name: data.name,
        lastName: data.lastName,
        motherLastName: data.motherLastName || undefined,
        branch: data.branch ? { id: data.branch.id } : undefined,
        jobScheduler: data.jobScheduler ? { id: data.jobScheduler.id } : undefined,
        commune: data.commune ? { id: data.commune.id } : undefined,
        country: data.country ? { id: data.country.id } : undefined,
        gender: data.gender ? { id: data.gender.id } : undefined,
        maritalStatus: data.maritalStatus ? { id: data.maritalStatus.id } : undefined,
        contractType: data.contractType ? { id: data.contractType.id } : undefined,
        jobType: data.jobType ? { id: data.jobType.id } : undefined
      }

      if (employeeId) {
        await updateEmployee(employeeId, payload)
        enqueueSnackbar('Empleado actualizado')
      } else {
        await saveEmployee(payload)
        enqueueSnackbar('Empleado creado')
      }
      router.push(paths.employee.list)
    } catch (error) {
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
    }
  })

  if (loading || !catalogs) {
    return (
      <Stack alignItems="center" sx={{ py: 8 }}>
        <CircularProgress />
      </Stack>
    )
  }

  // dropdown de una FK con pocas opciones (genérico: acepta cualquier modelo con id/name)
  const renderSelect = <T extends { id: number; name: string }>(
    name: keyof EmployeeFormValues,
    label: string,
    options: T[],
    required = false
  ) => (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          select
          fullWidth
          label={label}
          required={required}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          value={(field.value as { id: number } | null)?.id ?? ''}
          onChange={(e) => {
            const opt = options.find((o) => o.id === Number(e.target.value)) ?? null
            field.onChange(opt)
          }}
        >
          {options.map((o) => (
            <MenuItem key={o.id} value={o.id}>
              {o.name}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  )

  // campo con modal de búsqueda para una FK con muchas opciones
  const renderModalField = <T extends { id: number; name: string }>(
    name: keyof EmployeeFormValues,
    label: string,
    modalTitle: string,
    options: T[],
    required = false
  ) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <EntitySelectField
          label={label}
          modalTitle={modalTitle}
          options={options}
          value={(field.value as { id: number; name?: string } | null) ?? undefined}
          required={required}
          onChange={(opt) => field.onChange(opt)}
        />
      )}
    />
  )

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Typography variant="subtitle2" color="text.secondary">
            Datos personales
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <RHFTextField name="code" label="Código" required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <RHFTextField name="name" label="Nombre" required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <RHFTextField name="lastName" label="Apellido paterno" required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <RHFTextField name="motherLastName" label="Apellido materno" />
            </Grid>
          </Grid>

          <Divider />

          <Typography variant="subtitle2" color="text.secondary">
            Clasificación
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              {renderSelect('gender', 'Género', catalogs.genders, true)}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              {renderSelect('maritalStatus', 'Estado civil', catalogs.maritalStatus, true)}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              {renderSelect('contractType', 'Tipo de contrato', catalogs.contractTypes)}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              {renderSelect('jobType', 'Tipo de puesto', catalogs.jobTypes, true)}
            </Grid>
          </Grid>

          <Divider />

          <Typography variant="subtitle2" color="text.secondary">
            Ubicación y asignación
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              {renderModalField('country', 'Nacionalidad', 'Seleccionar nacionalidad', catalogs.countries, true)}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              {renderModalField('branch', 'Sede', 'Seleccionar sede', catalogs.branches, true)}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              {renderModalField('commune', 'Comuna', 'Seleccionar comuna', catalogs.communes, true)}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              {renderModalField('jobScheduler', 'Horario', 'Seleccionar horario', catalogs.jobSchedulers, true)}
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              component={RouterLink}
              href={paths.employee.list}
              variant="outlined"
              color="inherit"
            >
              Cancelar
            </Button>
            <Button type="submit" variant="contained" loading={isSubmitting}>
              {employeeId ? 'Guardar cambios' : 'Crear empleado'}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </FormProvider>
  )
}