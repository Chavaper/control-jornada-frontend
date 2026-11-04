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

import { EmployeeRequest, RefModel } from '@/model/employee.model'
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
  genders: RefModel[]
  maritalStatus: RefModel[]
  contractTypes: RefModel[]
  jobTypes: RefModel[]
  countries: RefModel[]
  branches: RefModel[]
  communes: RefModel[]
  jobSchedulers: RefModel[]
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

  // Carga catalogos (y el empleado si es edicion) en paralelo.
  // Aqui es donde luego pondras tus services reales con Promise.all.
  useEffect(() => {
    const load = async () => {
      try {
        const [genders,maritalStatus,contractTypes,jobTypes,
          countries,branches,communes,jobSchedulers] = 
          await Promise.all([
          mockGenders(),mockMaritalStatus(),mockContractTypes(),mockJobTypes(),
          mockCountries(),mockBranches(),mockCommunes(),mockJobSchedulers()
        ])

        setCatalogs({genders,maritalStatus,contractTypes,
          jobTypes,countries,branches,communes,jobSchedulers
        })

        if (employeeId) {
          const employee = await employeeById(employeeId)
          reset({
            code: employee.code ?? '',
            name: employee.name ?? '',
            last_name: employee.last_name ?? '',
            mother_last_name: employee.mother_last_name ?? '',
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
      // arma el payload que el backend espera (FK como { id })
      const payload: EmployeeRequest = {
        code: data.code,
        name: data.name,
        last_name: data.last_name,
        mother_last_name: data.mother_last_name || undefined,
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

  // helper: dropdown de una FK con pocas opciones
  const renderSelect = (name: keyof EmployeeFormValues,label: string,
    options: RefModel[],required = false) => (
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
          value={(field.value as RefModel | null)?.id ?? ''}
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

  // helper: campo con modal de busqueda para una FK con muchas opciones
  const renderModalField = (name: keyof EmployeeFormValues,label: string,
    modalTitle: string,options: RefModel[],required = false) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <EntitySelectField
          label={label}
          modalTitle={modalTitle}
          options={options}
          value={(field.value as RefModel | null) ?? undefined}
          required={required}
          onChange={(opt: RefModel) => field.onChange(opt)}
        />
      )}
    />
  )

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          {/* ---------- Datos personales ---------- */}
          <Typography variant="subtitle2" color="text.secondary">
            Datos personales
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <RHFTextField name="code" label="Codigo" required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <RHFTextField name="name" label="Nombre" required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <RHFTextField name="last_name" label="Apellido paterno" required />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <RHFTextField name="mother_last_name" label="Apellido materno" />
            </Grid>
          </Grid>

          <Divider />

          {/* ---------- Clasificacion (dropdowns: pocas opciones) ---------- */}
          <Typography variant="subtitle2" color="text.secondary">
            Clasificacion
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              {renderSelect('gender', 'Genero', catalogs.genders, true)}
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

          {/* ---------- Relaciones grandes (modal de busqueda) ---------- */}
          <Typography variant="subtitle2" color="text.secondary">
            Ubicacion y asignacion
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              {renderModalField(
                'country',
                'Nacionalidad',
                'Seleccionar nacionalidad',
                catalogs.countries,
                true
              )}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              {renderModalField('branch', 'Sede', 'Seleccionar sede', catalogs.branches, true)}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              {renderModalField('commune', 'Comuna', 'Seleccionar comuna', catalogs.communes, true)}
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              {renderModalField(
                'jobScheduler',
                'Horario',
                'Seleccionar horario',
                catalogs.jobSchedulers,
                true
              )}
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
