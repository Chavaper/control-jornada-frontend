import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined'
import BusinessIcon from '@mui/icons-material/BusinessOutlined'
import WorkIcon from '@mui/icons-material/WorkOutlineOutlined'
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
      {
        title: 'Tipo de justificación',
        path: paths.justificationType.root,
        icon: <CommentOutlinedIcon />
      },
      {
        title: 'Tipos de contrato',
        path: paths.contractType.root,
        icon: <DescriptionIcon />
      },
      { title: 'Países', path: paths.country.root, icon: <TaskIcon /> },
      { title: 'Sucursales', path: paths.branch.root, icon: <BusinessIcon /> },
      { title: 'Tipos de trabajo', path: paths.jobType.root, icon: <WorkIcon /> },
      { title: 'Ciudades', path: paths.city.root, icon: <LocationCityIcon /> }
    ]
  }
]
