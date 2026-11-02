import BusinessIcon from '@mui/icons-material/BusinessOutlined'
import LocationCityIcon from '@mui/icons-material/LocationCityOutlined'
import TaskIcon from '@mui/icons-material/TaskAltOutlined'

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
      { title: 'Países', path: paths.country.root, icon: <TaskIcon /> },
      { title: 'Ciudades', path: paths.city.root, icon: <LocationCityIcon /> },
      { title: 'Empresas', path: paths.company.root, icon: <BusinessIcon /> }
    ]
  }
]