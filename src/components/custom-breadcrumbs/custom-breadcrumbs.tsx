import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { RouterLink } from '@/routes/components'

import { CustomBreadcrumbsProps } from './types'

export default function CustomBreadcrumbs({
  heading,
  links,
  action,
  sx
}: CustomBreadcrumbsProps) {
  const lastIndex = links.length - 1

  return (
    <Box sx={sx}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
      >
        <Box sx={{ flexGrow: 1 }}>
          {heading && (
            <Typography variant="h4" gutterBottom>
              {heading}
            </Typography>
          )}

          <Breadcrumbs>
            {links.map((link, index) =>
              link.href && index !== lastIndex ? (
                <Link
                  key={link.name}
                  component={RouterLink}
                  href={link.href}
                  underline="hover"
                  color="text.primary"
                  variant="body2"
                >
                  {link.name}
                </Link>
              ) : (
                <Typography
                  key={link.name}
                  variant="body2"
                  color="text.disabled"
                >
                  {link.name}
                </Typography>
              )
            )}
          </Breadcrumbs>
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Stack>
    </Box>
  )
}
