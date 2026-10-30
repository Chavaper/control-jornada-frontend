import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'

import './globals.css'
import { Layout } from '@/components/layouts'
import { SnackbarProvider } from '@/components/snackbar'
import ThemeProvider from '@/themes'
import { primaryFont } from '@/themes/typography'

export const metadata: Metadata = {
  title: {
    default: 'Control de Jornada',
    template: '%s | Control de Jornada'
  },
  description: 'Proyecto inicial del entrenamiento de Next.js'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={primaryFont.className}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <SnackbarProvider>
              <Layout>{children}</Layout>
            </SnackbarProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
