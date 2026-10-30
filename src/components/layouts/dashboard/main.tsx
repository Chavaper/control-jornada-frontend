import Box from '@mui/material/Box'

import { HEADER, NAV } from '../config-layout'

interface Props {
  children: React.ReactNode
}

export default function Main({ children }: Props) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: '100vh',
        pt: {
          xs: `${HEADER.H_MOBILE + 24}px`,
          lg: `${HEADER.H_DESKTOP + 24}px`
        },
        pb: 6,
        px: { xs: 0, lg: 2 },
        width: { lg: `calc(100% - ${NAV.W_VERTICAL}px)` }
      }}
    >
      {children}
    </Box>
  )
}
