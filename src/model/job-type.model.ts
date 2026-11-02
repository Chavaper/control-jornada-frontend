export interface JobTypeModel {
  id: number
  name: string
  companyId: number
  branchId: number
}

export type JobTypeRequest = Omit<JobTypeModel, 'id'>
