export interface RefModel {
  id: number
  name?: string
}

export interface EmployeeModel {
  id: number
  uud?: string
  code: string
  name: string
  last_name: string
  mother_last_name?: string

  //Se recibe como objetos anidados con los campos id y name
  branch?: RefModel
  jobScheduler?: RefModel
  commune?: RefModel
  country?: RefModel
  gender?: RefModel
  maritalStatus?: RefModel
  contractType?: RefModel
  jobType?: RefModel
}

export type EmployeeRequest = Omit<EmployeeModel, 'id'>
