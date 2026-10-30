import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { APP_NAME } from '@/config/Global'

import { HEADER, NAV } from '../config-layout'

interface Props {
  onOpenNav: VoidFunction
}

export default function Header({ onOpenNav }: Props) {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        height: { xs: HEADER.H_MOBILE, lg: HEADER.H_DESKTOP },
        width: { lg: `calc(100% - ${NAV.W_VERTICAL}px)` },
        ml: { lg: `${NAV.W_VERTICAL}px` },
        borderBottom: 1,
        borderColor: 'divider',
        justifyContent: 'center'
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          onClick={onOpenNav}
          sx={{ mr: 1, display: { lg: 'none' } }}
          aria-label="Abrir menú"
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap>
          {APP_NAME}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
