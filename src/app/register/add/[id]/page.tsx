import { RegisterEditView } from '@/sections/register/view'

export const metadata = {
  title: 'Editar registro'
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params

  return <RegisterEditView id={id} />
}