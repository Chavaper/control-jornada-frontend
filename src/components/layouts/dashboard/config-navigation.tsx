import TaskIcon from '@mui/icons-material/TaskAltOutlined'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';

import { paths } from '@/routes/paths'

export interface NavItem {
  title: string
  path: string
  icon: React.ReactNode
}

export interface NavGroup {
  subheader: string
  items: NavItem[]
}

export const navData: NavGroup[] = [
  {
    subheader: 'Opciones',
    items: [
      { title: 'Tareas', path: paths.task.root, icon: <TaskIcon /> },
      { title: 'Países', path: paths.country.root, icon: <PublicOutlinedIcon /> }
    ]
  }
]
