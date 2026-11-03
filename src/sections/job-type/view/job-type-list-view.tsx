'use client'

import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useEffect, useState } from 'react'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { TableLoading, TableNoData } from '@/components/table'
import { useSnackbar } from '@/components/snackbar'
import { getErrorMessage } from '@/helpers/API'
import { JobTypeModel } from '@/model'
import { RouterLink } from '@/routes/components'
import { useRouter } from '@/routes/hooks'
import { paths } from '@/routes/paths'
import {
  allJobTypes,
  deleteJobType
} from '@/services/rest'

import JobTypeTableRow from '../job-type-table-row'
import { TABLE_HEAD } from '../job-type'

export default function JobTypeListView() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [jobTypes, setJobTypes] = useState<JobTypeModel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    allJobTypes()
      .then((jobTypeList) => {
        setJobTypes(jobTypeList)
      })
      .catch((error) => enqueueSnackbar(getErrorMessage(error), { variant: 'error' }))
      .finally(() => setLoading(false))
  }, [enqueueSnackbar])

  const remove = async (id: number) => {
    try { await deleteJobType(id); setJobTypes((items) => items.filter((item) => item.id !== id)); enqueueSnackbar('Tipo de trabajo eliminado') }
    catch (error) { enqueueSnackbar(getErrorMessage(error), { variant: 'error' }) }
  }

  return <Container maxWidth="xl">
    <CustomBreadcrumbs heading="Tipos de trabajo" links={[{ name: 'Tipos de trabajo', href: paths.jobType.list }, { name: 'Lista' }]} action={<Button component={RouterLink} href={paths.jobType.add} variant="contained" startIcon={<AddIcon />}>Agregar</Button>} sx={{ mb: 3 }} />
    <Card><TableContainer><Table><TableHead><TableRow>{TABLE_HEAD.map((head) => <TableCell key={head.id || 'actions'} align={head.align} sx={{ width: head.width }}>{head.label}</TableCell>)}</TableRow></TableHead><TableBody>
      {loading && <TableLoading colSpan={TABLE_HEAD.length} />}
      {!loading && jobTypes.map((row) => <JobTypeTableRow key={row.id} row={row} companyName={row.companyName ?? 'Empresa no disponible'} branchName={row.branchName ?? 'Sucursal no disponible'} onEditRow={() => router.push(paths.jobType.edit(row.id))} onDeleteRow={() => remove(row.id)} />)}
      {!loading && !jobTypes.length && <TableNoData colSpan={TABLE_HEAD.length} />}
    </TableBody></Table></TableContainer></Card>
  </Container>
}
