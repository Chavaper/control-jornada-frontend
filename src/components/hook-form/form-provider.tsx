import {
  FieldValues,
  FormProvider as Form,
  UseFormReturn
} from 'react-hook-form'

interface Props<T extends FieldValues> {
  children: React.ReactNode
  methods: UseFormReturn<T>
  onSubmit?: VoidFunction
}

export default function FormProvider<T extends FieldValues>({
  children,
  methods,
  onSubmit
}: Props<T>) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} noValidate>
        {children}
      </form>
    </Form>
  )
}
