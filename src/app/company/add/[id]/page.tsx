import { CompanyEditView } from '@/sections/company/view'

export const metadata = {
  title: 'Editar empresa'
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params

  return <CompanyEditView id={id} />
}
