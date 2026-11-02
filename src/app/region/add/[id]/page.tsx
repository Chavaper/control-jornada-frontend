import { RegionEditView } from '@/sections/region/view'

export const metadata = {
  title: 'Editar región'
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params

  return <RegionEditView id={id} />
}
