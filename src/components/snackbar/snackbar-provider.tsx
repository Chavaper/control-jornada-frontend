'use client'

import { SnackbarProvider as NotistackProvider, useSnackbar } from 'notistack'

export { useSnackbar }

interface Props {
  children: React.ReactNode
}

export default function SnackbarProvider({ children }: Props) {
  return (
    <NotistackProvider
      maxSnack={3}
      autoHideDuration={3000}
      preventDuplicate
      variant="success"
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      {children}
    </NotistackProvider>
  )
}
