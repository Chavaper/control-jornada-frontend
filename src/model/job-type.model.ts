export interface JobTypeModel {
  id: number
  name: string
  companyId: number
  branchId: number
  companyName?: string | null
  branchName?: string | null
}

export type JobTypeRequest = Omit<JobTypeModel, 'id'>
