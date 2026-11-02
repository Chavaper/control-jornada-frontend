export interface RegisterModel {
  id: number
  employeeId: number
  startOfTheDay: string
  entry: string | null
  exit: string | null
  breakTime: string | null
  backToWork: string | null
  day: string
  justificationId: number | null
  active?: boolean
  inUse?: boolean
}

export type RegisterRequest = Omit<RegisterModel, 'id'>