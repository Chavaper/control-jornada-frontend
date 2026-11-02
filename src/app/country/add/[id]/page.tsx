import { CountryEditView } from '@/sections/country/view'

export const metadata = {
  title: 'Editar país'
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params

  return <CountryEditView id={id} />
}
