export interface JustificationTypeModel {
  id: number
  name: string
}

export type JustificationTypeRequest = Omit<JustificationTypeModel, 'id'>
