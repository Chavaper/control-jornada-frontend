import DeleteIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/EditOutlined'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'

import { ConfirmDialog } from '@/components/custom-dialog'
import Label from '@/components/label'
import { useBoolean } from '@/hooks/use-boolean'
import { CountryModel } from '@/model/country.model'

interface Props {
  row: CountryModel
  onEditRow: VoidFunction
  onDeleteRow: VoidFunction
}

export default function CountryTableRow({ row, onEditRow, onDeleteRow }: Props) {
  const confirm = useBoolean()

  return (
    <>
      <TableRow hover>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.nationality}</TableCell>
        <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
          <Tooltip title="Editar">
            <IconButton onClick={onEditRow}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton color="error" onClick={confirm.onTrue}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Eliminar"
        content={
          <>
            ¿Seguro que quieres eliminar el país <strong>{row.name}</strong>?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              confirm.onFalse()
              onDeleteRow()
            }}
          >
            Eliminar
          </Button>
        }
      />
    </>
  )
}
