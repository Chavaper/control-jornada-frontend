import { CommuneEditView } from '@/sections/commune/view'

export const metadata = {
  title: 'Editar comuna'
}
interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params

  return <CommuneEditView id={id} />
}
