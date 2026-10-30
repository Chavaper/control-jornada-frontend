import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Typography from '@mui/material/Typography'

import { RouterLink } from '@/routes/components'
import { usePathname } from '@/routes/hooks'

import { HEADER, NAV } from '../config-layout'
import { navData } from './config-navigation'

interface Props {
  openNav: boolean
  onCloseNav: VoidFunction
}

const isActive = (pathname: string, path: string) => {
  const root = path.split('/').slice(0, 2).join('/')
  return pathname.startsWith(root)
}

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const pathname = usePathname()

  const content = (
    <Box>
      <Box
        sx={{
          height: { xs: HEADER.H_MOBILE, lg: HEADER.H_DESKTOP },
          display: 'flex',
          alignItems: 'center',
          px: 3
        }}
      >
        <Typography variant="h6" color="primary">
          Bennu
        </Typography>
      </Box>

      {navData.map((group) => (
        <List
          key={group.subheader}
          subheader={
            <ListSubheader
              disableSticky
              sx={{ typography: 'overline', color: 'text.disabled' }}
            >
              {group.subheader}
            </ListSubheader>
          }
          sx={{ px: 1.5 }}
        >
          {group.items.map((item) => (
            <ListItemButton
              key={item.path}
              component={RouterLink}
              href={item.path}
              selected={isActive(pathname, item.path)}
              onClick={onCloseNav}
              sx={{ borderRadius: 1, mb: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))}
        </List>
      ))}
    </Box>
  )

  return (
    <Box
      component="nav"
      sx={{ width: { lg: NAV.W_VERTICAL }, flexShrink: { lg: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={openNav}
        onClose={onCloseNav}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': { width: NAV.W_VERTICAL }
        }}
      >
        {content}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            width: NAV.W_VERTICAL,
            borderRight: '1px dashed',
            borderColor: 'divider'
          }
        }}
      >
        {content}
      </Drawer>
    </Box>
  )
}
