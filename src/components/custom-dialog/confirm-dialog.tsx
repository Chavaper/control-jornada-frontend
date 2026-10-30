import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import { ConfirmDialogProps } from './types'

export default function ConfirmDialog({
  open,
  title,
  content,
  action,
  onClose,
  cancelLabel = 'Cancelar'
}: ConfirmDialogProps) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      {content && (
        <DialogContent sx={{ typography: 'body2' }}>{content}</DialogContent>
      )}

      <DialogActions>
        {action}
        <Button variant="outlined" color="inherit" onClick={onClose}>
          {cancelLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
