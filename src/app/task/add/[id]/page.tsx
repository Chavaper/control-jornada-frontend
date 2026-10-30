import { TaskEditView } from '@/sections/task/view'

export const metadata = {
  title: 'Editar tarea'
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params

  return <TaskEditView id={id} />
}
