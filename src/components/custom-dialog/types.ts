export interface ConfirmDialogProps {
  open: boolean
  title: React.ReactNode
  content?: React.ReactNode
  action: React.ReactNode
  onClose: VoidFunction
  cancelLabel?: string
}
