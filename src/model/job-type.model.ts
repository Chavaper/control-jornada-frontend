import { CompanyOption } from './branch.model'

export interface JobTypeModel {
  id: number
  name: string
  company: CompanyOption
  branch: BranchOption
}

export interface BranchOption {
  id: number
  name: string
  company?: Pick<CompanyOption, 'id'>
}

export interface JobTypeRequest {
  name: string
  company: Pick<CompanyOption, 'id'>
  branch: Pick<BranchOption, 'id'>
}
