import TaskIcon from '@mui/icons-material/TaskAltOutlined'
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined'

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
      {
        title: 'Tipos de contrato',
        path: paths.contractType.root,
        icon: <DescriptionIcon />
      }
    ]
  }
]
