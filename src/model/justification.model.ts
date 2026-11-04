export interface JustificationModel {
  id: number
  comments: string | null
  attachment: string | null
  justificationTypeId: number
  justificationTypeName?: string
}

export type JustificationRequest = Omit<
  JustificationModel,
  'id' | 'justificationTypeName'
>

export interface JustificationTypeOption {
  id: number
  name: string
}