import DashboardLayout from '../layouts/dashboard'

interface Props {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  return <DashboardLayout>{children}</DashboardLayout>
}
