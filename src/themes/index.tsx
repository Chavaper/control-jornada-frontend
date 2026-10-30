'use client'

import CssBaseline from '@mui/material/CssBaseline'
import {
  createTheme,
  ThemeProvider as MuiThemeProvider
} from '@mui/material/styles'

import { palette } from './palette'
import { typography } from './typography'

const theme = createTheme({
  palette,
  typography,
  shape: { borderRadius: 8 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow:
            '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: palette.grey[200],
          color: palette.text.secondary,
          fontWeight: 600
        }
      }
    }
  }
})

interface Props {
  children: React.ReactNode
}

export default function ThemeProvider({ children }: Props) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}
