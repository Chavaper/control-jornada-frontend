import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'

import { Order } from '@/utils/table-filter'

import { TableHeadItem } from './types'

interface Props {
  headLabel: TableHeadItem[]
  order: Order
  orderBy: string
  onSort: (id: string) => void
}

export default function TableHeadCustom({
  headLabel,
  order,
  orderBy,
  onSort
}: Props) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((head) => (
          <TableCell
            key={head.id || 'actions'}
            align={head.align ?? 'left'}
            sortDirection={orderBy === head.id ? order : false}
            sx={{ width: head.width }}
          >
            {head.sortable === false || !head.id ? (
              head.label
            ) : (
              <TableSortLabel
                active={orderBy === head.id}
                direction={orderBy === head.id ? order : 'asc'}
                onClick={() => onSort(head.id)}
              >
                {head.label}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
