'use client'

import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import { useEffect, useState } from 'react'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import { useSnackbar } from '@/components/snackbar'
import {
  TableHeadCustom,
  TableLoading,
  TableNoData,
  TablePaginationCustom,
  useTable
} from '@/components/table'
import { getErrorMessage } from '@/helpers/API'
import { JustificationTypeModel } from '@/model'
import { RouterLink } from '@/routes/components'
import { useRouter } from '@/routes/hooks'
import { paths } from '@/routes/paths'
import { allJustificationTypes, deleteJustificationType } from '@/services/rest'
import { getComparator, includesText, Order } from '@/utils/table-filter'

import { TABLE_HEAD } from '../justificationType'
import JustificationTypeTableRow from '../justification-type-table-row'
import JustificationTypeTableToolbar from '../justification-type-table-toolbar'

export default function JustifcationTypeListView() {
  const router = useRouter()
  const table = useTable()
  const { enqueueSnackbar } = useSnackbar()

  const [justificationTypeList, setJustificationTypeList] = useState<
    JustificationTypeModel[]
  >([])
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const getJustificationTypes = async () => {
      try {
        const response = await allJustificationTypes()
        setJustificationTypeList(response)
      } catch (error) {
        enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    getJustificationTypes()
  }, [enqueueSnackbar])

  const dataFiltered = applyFilter({
    justificationTypeList,
    searchText,
    order: table.order,
    orderBy: table.orderBy as keyof JustificationTypeModel
  })

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  )

  const handleSearch = (value: string) => {
    table.onResetPage()
    setSearchText(value)
  }

  const handleDeleteRow = async (id: number) => {
    try {
      await deleteJustificationType(id)
      enqueueSnackbar('Tipo eliminado')
      setJustificationTypeList((prev) =>
        prev.filter((justType) => justType.id !== id)
      )
      if (dataInPage.length === 1 && table.page > 0) {
        table.onChangePage(null, table.page - 1)
      }
    } catch (error) {
      enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
    }
  }

  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="Lista de tipos de justificación"
        links={[
          {
            name: 'Tipos de justificación',
            href: paths.justificationType.root
          },
          { name: 'Lista' }
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.justificationType.add}
            variant="contained"
            startIcon={<AddIcon />}
          >
            Agregar
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <JustificationTypeTableToolbar
          text={searchText}
          onChangeText={handleSearch}
        />

        <TableContainer>
          <Table sx={{ minWidth: 720 }}>
            <TableHeadCustom
              headLabel={TABLE_HEAD}
              order={table.order}
              orderBy={table.orderBy}
              onSort={table.onSort}
            />

            <TableBody>
              {loading && <TableLoading colSpan={TABLE_HEAD.length} />}

              {!loading &&
                dataInPage.map((row) => (
                  <JustificationTypeTableRow
                    key={row.id}
                    row={row}
                    onEditRow={() =>
                      router.push(paths.justificationType.edit(row.id))
                    }
                    onDeleteRow={() => handleDeleteRow(row.id)}
                  />
                ))}

              {!loading && !dataFiltered.length && (
                <TableNoData colSpan={TABLE_HEAD.length} />
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePaginationCustom
          count={dataFiltered.length}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </Container>
  )
}

function applyFilter({
  justificationTypeList,
  searchText,
  order,
  orderBy
}: {
  justificationTypeList: JustificationTypeModel[]
  searchText: string
  order: Order
  orderBy: keyof JustificationTypeModel
}) {
  return [...justificationTypeList]
    .filter(
      (justType) => !searchText || includesText(justType.name, searchText)
    )
    .sort(getComparator<JustificationTypeModel>(order, orderBy))
}
