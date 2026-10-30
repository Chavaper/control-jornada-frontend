import CircularProgress from '@mui/material/CircularProgress'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

interface Props {
  colSpan: number
}

export default function TableLoading({ colSpan }: Props) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center" sx={{ py: 6 }}>
        <CircularProgress size={32} />
      </TableCell>
    </TableRow>
  )
}
