import FormControlLabel, {
  FormControlLabelProps
} from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { Controller, useFormContext } from 'react-hook-form'

interface Props extends Omit<FormControlLabelProps, 'control'> {
  name: string
}

export default function RHFSwitch({ name, ...other }: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={<Switch {...field} checked={!!field.value} />}
          {...other}
        />
      )}
    />
  )
}
