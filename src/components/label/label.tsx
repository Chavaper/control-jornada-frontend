import Chip from '@mui/material/Chip'

export type LabelColor = 'default' | 'success' | 'warning' | 'error' | 'info'

interface Props {
  color?: LabelColor
  children: React.ReactNode
}

export default function Label({ color = 'default', children }: Props) {
  return (
    <Chip
      size="small"
      label={children}
      color={color}
      variant="outlined"
      sx={{ fontWeight: 600, borderRadius: 1 }}
    />
  )
}
