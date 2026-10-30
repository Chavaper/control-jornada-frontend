import { SxProps, Theme } from '@mui/material/styles'

export interface BreadcrumbsLinkProps {
  name: string
  href?: string
}

export interface CustomBreadcrumbsProps {
  heading?: string
  links: BreadcrumbsLinkProps[]
  action?: React.ReactNode
  sx?: SxProps<Theme>
}
