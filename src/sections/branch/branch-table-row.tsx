import DeleteIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/EditOutlined'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Switch from '@mui/material/Switch'
import Tooltip from '@mui/material/Tooltip'

import { ConfirmDialog } from '@/components/custom-dialog'
import { useBoolean } from '@/hooks/use-boolean'
import { BranchModel } from '@/model'

interface Props {
  row: BranchModel
  onEditRow: VoidFunction
  onDeleteRow: VoidFunction
  onToggleActive: (active: boolean) => Promise<void>
}

export default function BranchTableRow({ row, onEditRow, onDeleteRow, onToggleActive }: Props) {
  const confirm = useBoolean()
  return <>
    <TableRow hover>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.companyName || 'Sin Información'}</TableCell>
      <TableCell>{row.communeName || 'Sin Información'}</TableCell>
      <TableCell>{row.address}</TableCell>
      <TableCell>{row.phone || 'Sin Información'}</TableCell>
      <TableCell>{row.alias || 'Sin Información'}</TableCell>
      <TableCell>
        <Switch
          checked={!!row.active}
          onChange={(event) => onToggleActive(event.target.checked)}
          inputProps={{ 'aria-label': `Activar sucursal ${row.name}` }}
        />
      </TableCell>
      <TableCell align="right">
        <Tooltip title="Editar"><IconButton onClick={onEditRow}><EditIcon /></IconButton></Tooltip>
        <Tooltip title="Eliminar"><IconButton color="error" onClick={confirm.onTrue}><DeleteIcon /></IconButton></Tooltip>
      </TableCell>
    </TableRow>
    <ConfirmDialog open={confirm.value} onClose={confirm.onFalse} title="Eliminar" content={<>¿Seguro que quieres eliminar la sucursal <strong>{row.name}</strong>?</>} action={<Button variant="contained" color="error" onClick={() => { confirm.onFalse(); onDeleteRow() }}>Eliminar</Button>} />
  </>
}
