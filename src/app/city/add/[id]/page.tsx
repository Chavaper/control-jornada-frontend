import { CityEditView } from '@/sections/city/view'

export const metadata = {
  title: 'Editar ciudad'
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params

  return <CityEditView id={id} />
}
