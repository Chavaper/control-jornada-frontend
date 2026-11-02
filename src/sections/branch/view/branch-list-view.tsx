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
import { BranchModel } from '@/model'
import { RouterLink } from '@/routes/components'
import { useRouter } from '@/routes/hooks'
import { paths } from '@/routes/paths'
import { allBranches, deleteBranch } from '@/services/rest'

import BranchTableRow from '../branch-table-row'
import { TABLE_HEAD } from '../branch'

export default function BranchListView() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [branches, setBranches] = useState<BranchModel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    allBranches().then(setBranches).catch((error) => enqueueSnackbar(getErrorMessage(error), { variant: 'error' })).finally(() => setLoading(false))
  }, [enqueueSnackbar])

  const remove = async (id: number) => {
    try { await deleteBranch(id); setBranches((items) => items.filter((item) => item.id !== id)); enqueueSnackbar('Sucursal eliminada') }
    catch (error) { enqueueSnackbar(getErrorMessage(error), { variant: 'error' }) }
  }

  return <Container maxWidth="xl">
    <CustomBreadcrumbs heading="Sucursales" links={[{ name: 'Sucursales', href: paths.branch.list }, { name: 'Lista' }]} action={<Button component={RouterLink} href={paths.branch.add} variant="contained" startIcon={<AddIcon />}>Agregar</Button>} sx={{ mb: 3 }} />
    <Card><TableContainer><Table><TableHead><TableRow>{TABLE_HEAD.map((head) => <TableCell key={head.id || 'actions'} align={head.align} sx={{ width: head.width }}>{head.label}</TableCell>)}</TableRow></TableHead><TableBody>
      {loading && <TableLoading colSpan={TABLE_HEAD.length} />}
      {!loading && branches.map((row) => <BranchTableRow key={row.id} row={row} onEditRow={() => router.push(paths.branch.edit(row.id))} onDeleteRow={() => remove(row.id)} />)}
      {!loading && !branches.length && <TableNoData colSpan={TABLE_HEAD.length} />}
    </TableBody></Table></TableContainer></Card>
  </Container>
}
