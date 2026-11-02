'use client'

import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'
import {
    TableLoading,
    TableNoData
} from '@/components/table'
import { getErrorMessage } from '@/helpers/API'
import { ContractTypeModel } from '@/model'
import { RouterLink } from '@/routes/components'
import { useRouter } from '@/routes/hooks'
import { paths } from '@/routes/paths'
import {
    allContractTypes,
    deleteContractType
} from '@/services/rest'
import { useSnackbar } from '@/components/snackbar'

import ContractTypeTableRow from '../contract-type-table-row'
import { TABLE_HEAD } from '../contract-type'

export default function ContractTypeListView() {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    const [contractTypes, setContractTypes] = useState<
        ContractTypeModel[]
    >([])

    const [loading, setLoading] = useState(true)
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        const getContractTypes = async () => {
            try {
                const response = await allContractTypes()
                setContractTypes(response)
            } catch (error) {
                enqueueSnackbar(getErrorMessage(error), {
                    variant: 'error'
                })
            } finally {
                setLoading(false)
            }
        }

        getContractTypes()
    }, [enqueueSnackbar])

    const filteredContractTypes = contractTypes.filter(
        (contractType) =>
            contractType.name
                .toLowerCase()
                .includes(searchText.toLowerCase())
    )

    const handleDeleteRow = async (id: number) => {
        try {
            await deleteContractType(id)

            enqueueSnackbar('Tipo de contrato eliminado')

            setContractTypes((currentContractTypes) =>
                currentContractTypes.filter(
                    (contractType) => contractType.id !== id
                )
            )
        } catch (error) {
            enqueueSnackbar(getErrorMessage(error), {
                variant: 'error'
            })
        }
    }

    return (
        <Container maxWidth="md">
            <CustomBreadcrumbs
                heading="Tipos de contrato"
                links={[
                    {
                        name: 'Tipos de contrato',
                        href: paths.contractType.list
                    },
                    {
                        name: 'Lista'
                    }
                ]}
                action={
                    <Button
                        component={RouterLink}
                        href={paths.contractType.add}
                        variant="contained"
                        startIcon={<AddIcon />}
                    >
                        Agregar
                    </Button>
                }
                sx={{ mb: 3 }}
            />

            <TextField
                label="Buscar por nombre"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />

            <Card>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {TABLE_HEAD.map((head) => (
                                    <TableCell
                                        key={head.id || 'actions'}
                                        align={head.align}
                                        sx={{ width: head.width }}
                                    >
                                        {head.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {loading && (
                                <TableLoading colSpan={TABLE_HEAD.length} />
                            )}

                            {!loading &&
                                filteredContractTypes.map((row) => (
                                    <ContractTypeTableRow
                                        key={row.id}
                                        row={row}
                                        onEditRow={() =>
                                            router.push(
                                                paths.contractType.edit(row.id)
                                            )
                                        }
                                        onDeleteRow={() =>
                                            handleDeleteRow(row.id)
                                        }
                                    />
                                ))}

                            {!loading &&
                                filteredContractTypes.length === 0 && (
                                    <TableNoData colSpan={TABLE_HEAD.length} />
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Container>
    )
}