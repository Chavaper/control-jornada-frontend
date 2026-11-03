import { JustificationTypeEditView } from '@/sections/justification-type/view'

export const metadata = {
  title: 'Editar tipo de justificacion'
}
interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params

  return <JustificationTypeEditView id={id} />
}
