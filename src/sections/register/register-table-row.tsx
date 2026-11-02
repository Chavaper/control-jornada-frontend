import DeleteIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/EditOutlined'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'

import { ConfirmDialog } from '@/components/custom-dialog'
import { useBoolean } from '@/hooks/use-boolean'
import { RegisterModel } from '@/model'

interface Props {
  row: RegisterModel
  onEditRow: VoidFunction
  onDeleteRow: VoidFunction
}

export default function RegisterTableRow({
  row,
  onEditRow,
  onDeleteRow
}: Props) {
  const confirm = useBoolean()

  return (
    <>
      <TableRow hover>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.employeeId}</TableCell>
        <TableCell>{row.day}</TableCell>
        <TableCell>{row.startOfTheDay}</TableCell>
        <TableCell>{row.entry || '-'}</TableCell>
        <TableCell>{row.exit || '-'}</TableCell>

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
            ¿Seguro que quieres eliminar el registro <strong>{row.id}</strong>?
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