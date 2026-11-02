import { ContractTypeEditView } from '@/sections/contract-type/view'

export const metadata = {
  title: 'Editar tipo de contrato'
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params

  return <ContractTypeEditView id={id} />
}
