import TablePagination, {
  TablePaginationProps
} from '@mui/material/TablePagination'

import { ROWS_PER_PAGE_OPTIONS } from '@/config/Global'

export default function TablePaginationCustom(props: TablePaginationProps) {
  return (
    <TablePagination
      component="div"
      rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
      labelRowsPerPage="Filas por página"
      labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      {...props}
    />
  )
}
