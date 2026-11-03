export interface BranchModel {
  id: number
  companyId: number
  communeId: number
  companyName?: string | null
  communeName?: string | null
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

export type BranchRequest = Omit<BranchModel, 'id'>
