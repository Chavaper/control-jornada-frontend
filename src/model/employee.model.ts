export interface EmployeeModel {
  id: number
  code: string
  name: string
  lastName: string
  motherLastName: string | null
  active: boolean
}

export type EmployeeOption = Pick<
  EmployeeModel,
  'id' | 'code' | 'name' | 'lastName' | 'motherLastName'
>

export const getEmployeeFullName = (
  employee: EmployeeOption
): string =>
  [
    employee.name,
    employee.lastName,
    employee.motherLastName
  ]
    .filter(Boolean)
    .join(' ')