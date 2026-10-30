import { useCallback, useState } from 'react'

import { Order } from '@/utils/table-filter'

interface UseTableProps {
  defaultOrderBy?: string
  defaultOrder?: Order
  defaultRowsPerPage?: number
}

export default function useTable(props?: UseTableProps) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(props?.defaultRowsPerPage ?? 5)
  const [orderBy, setOrderBy] = useState(props?.defaultOrderBy ?? 'id')
  const [order, setOrder] = useState<Order>(props?.defaultOrder ?? 'asc')

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(id)
    },
    [order, orderBy]
  )

  const onChangePage = useCallback((_: unknown, newPage: number) => {
    setPage(newPage)
  }, [])

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPage(0)
      setRowsPerPage(parseInt(event.target.value, 10))
    },
    []
  )

  const onResetPage = useCallback(() => setPage(0), [])

  return {
    page,
    rowsPerPage,
    order,
    orderBy,
    onSort,
    onChangePage,
    onChangeRowsPerPage,
    onResetPage
  }
}
