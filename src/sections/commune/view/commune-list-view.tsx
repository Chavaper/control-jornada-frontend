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
import { CommuneModel } from '@/model'
import { RouterLink } from '@/routes/components'
import { useRouter } from '@/routes/hooks'
import { paths } from '@/routes/paths'
import { allCommunes, deleteCommune } from '@/services/rest'
import { getComparator, includesText, Order } from '@/utils/table-filter'

import { TABLE_HEAD } from '../commune'
import CommuneTableRow from '../commune-table-row'
import CommuneTableToolbar from '../commune-table-toolbar'

export default function CommuneListView() {
  const router = useRouter()
  const table = useTable()
  const { enqueueSnackbar } = useSnackbar()

  const [communeList, setCommuneList] = useState<
    CommuneModel[]
  >([])
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const getCommunes = async () => {
      try {
        const response = await allCommunes()
        setCommuneList(response)
      } catch (error) {
        enqueueSnackbar(getErrorMessage(error), { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    getCommunes()
  }, [enqueueSnackbar])

  const dataFiltered = applyFilter({
    communeList,
    searchText,
    order: table.order,
    orderBy: table.orderBy as keyof CommuneModel
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
      await deleteCommune(id)
      enqueueSnackbar('Tipo eliminado')
      setCommuneList((prev) =>
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
        heading="Lista de comunas"
        links={[
          {
            name: 'Comunas',
            href: paths.commune.root
          },
          { name: 'Lista' }
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.commune.add}
            variant="contained"
            startIcon={<AddIcon />}
          >
            Agregar
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <CommuneTableToolbar
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
                  <CommuneTableRow
                    key={row.id}
                    row={row}
                    onEditRow={() =>
                      router.push(paths.commune.edit(row.id))
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
  communeList,
  searchText,
  order,
  orderBy
}: {
  communeList: CommuneModel[]
  searchText: string
  order: Order
  orderBy: keyof CommuneModel
}) {
  return [...communeList]
    .filter(
      (commune) => !searchText || includesText(commune.name, searchText)
    )
    .sort(getComparator<CommuneModel>(order, orderBy))
}
