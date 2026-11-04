export interface BranchModel {
  id: number
  company: CompanyOption
  commune: CommuneOption
  name: string
  address: string
  phone?: string | null
  alias?: string | null
  active?: boolean | null
}

export interface CompanyOption {
  id: number
  name: string
}

export interface CommuneOption {
  id: number
  name: string
}

export interface BranchRequest {
  company: Pick<CompanyOption, 'id'>
  commune: Pick<CommuneOption, 'id'>
  name: string
  address: string
  phone?: string
  alias?: string
  active?: boolean
}
