'use client'

import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', py: 10 }}>
      <Typography variant="h4" gutterBottom>
        Algo salió mal
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        {error.message}
      </Typography>
      <Button variant="contained" onClick={reset}>
        Reintentar
      </Button>
    </Container>
  )
}
