import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { RouterLink } from '@/routes/components'
import { paths } from '@/routes/paths'

export const metadata = {
  title: 'Página no encontrada'
}

export default function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', py: 10 }}>
      <Typography variant="h3" gutterBottom>
        Página no encontrada
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        La ruta que buscas no existe o fue movida.
      </Typography>
      <Button component={RouterLink} href={paths.home} variant="contained">
        Ir al inicio
      </Button>
    </Container>
  )
}
