import {
  BranchModel,
  CommuneModel,
  ContractTypeModel,
  CountryModel,
  EmployeeModel,
  EmployeeRequest,
  GenderModel,
  JobSchedulerModel,
  JobTypeModel,
  MaritalStatusModel
} from '@/model'
// ============================================================
// SERVICIO DE EMPLEADOS — con datos simulados (mock)
// ============================================================
// Cuando conectes el backend real, reemplaza el cuerpo de cada
// funcion por un fetch. La firma se mantiene igual, asi no
// tocas los componentes que lo usan.
//
// Ejemplo real (cuando toque):
//   const apiUrl = `${process.env.BASE_URL_API}/v1/template/employee`
//   export const allEmployees = async () => {
//     const res = await fetch(apiUrl)
//     return handleResponse<EmployeeModel[]>(res)
//   }
// ============================================================

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))

const MOCK_EMPLOYEES: EmployeeModel[] = [
{
  id: 1,
  uuid: '74125896',
  code: 'EMP001',
  name: 'Pedro',
  lastName: 'Perez',
  motherLastName: 'Garcia',
  country: { id: 1, name: 'Peru', nationality: 'Peruana' },
  gender: { id: 1, name: 'Masculino' },
  maritalStatus: { id: 1, name: 'Casado' },
  contractType: { id: 1, name: 'Indefinido' },
  jobType: { id: 1, name: 'Operario' },
  branch: { id: 1, name: 'Sede Central' },
  commune: { id: 1, name: 'Lima' },
  jobScheduler: { id: 1, name: 'Turno manana' }
},
]

// copia mutable en memoria para simular el CRUD
let store = [...MOCK_EMPLOYEES]

export const allEmployees = async (): Promise<EmployeeModel[]> => {
  await delay()
  return [...store]
}

export const employeeById = async (id: string | number): Promise<EmployeeModel> => {
  await delay()
  const found = store.find((e) => e.id === Number(id))
  if (!found) throw new Error('El empleado no existe')
  return { ...found }
}

export const saveEmployee = async (employee: EmployeeRequest): Promise<EmployeeModel> => {
  await delay()
  const nextId = store.length ? Math.max(...store.map((e) => e.id)) + 1 : 1
  const created = { ...employee, id: nextId } as unknown as EmployeeModel
  store.push(created)
  return created
}

export const updateEmployee = async (
  id: string | number,
  employee: EmployeeRequest
): Promise<EmployeeModel> => {
  await delay()
  const idx = store.findIndex((e) => e.id === Number(id))
  if (idx === -1) throw new Error('El empleado no existe')
  const updated: EmployeeModel = { ...(employee as EmployeeModel), id: Number(id) }
  store[idx] = updated
  return updated
}

export const deleteEmployee = async (id: string | number): Promise<void> => {
  await delay()
  store = store.filter((e) => e.id !== Number(id))
}

// ============================================================
// CATALOGOS (para dropdowns y modales de seleccion)
// ============================================================
// Cuando tengas los services reales, aqui es donde haras el
// Promise.all para cargar todo a la vez. Ejemplo:
//
//   const [genders, maritals, contracts, jobs] = await Promise.all([
//     allGenders(), allMaritalStatus(), allContractTypes(), allJobTypes()
//   ])
// ============================================================

export const mockGenders = async (): Promise<GenderModel[]> => {
  await delay(150)
  return [
    { id: 1, name: 'Masculino' },
    { id: 2, name: 'Femenino' }
  ]
}

export const mockMaritalStatus = async (): Promise<MaritalStatusModel[]> => {
  await delay(150)
  return [
    { id: 1, name: 'Casado' },
    { id: 2, name: 'Viudo' },
    { id: 3, name: 'Divorciado' },
    { id: 4, name: 'Soltero' }
  ]
}

export const mockContractTypes = async (): Promise<ContractTypeModel[]> => {
  await delay(150)
  return [
    { id: 1, name: 'Indefinido' },
    { id: 2, name: 'Plazo fijo' },
    { id: 3, name: 'Por obra' }
  ]
}

export const mockJobTypes = async (): Promise<JobTypeModel[]> => {
  await delay(150)
  return [
    { id: 1, name: 'Operario' },
    { id: 2, name: 'Administrativo' },
    { id: 3, name: 'Supervisor' }
  ]
}

// Catalogos grandes -> se usan con modal de busqueda
export const mockCountries = async (): Promise<CountryModel[]> => {
  await delay(150)
  return [
    { id: 1, name: 'Peru', nationality: 'Peruana' },
    { id: 2, name: 'Chile', nationality: 'Chilena' },
    { id: 3, name: 'Argentina', nationality: 'Argentina' }
    // ...el resto, agregando nationality a cada uno
  ]
}

export const mockBranches = async (): Promise<BranchModel[]> => {
  await delay(150)
  return [
    { id: 1, name: 'Sede Central' },
    { id: 2, name: 'Sede Norte' },
    { id: 3, name: 'Sede Sur' },
    { id: 4, name: 'Sede Este' }
  ]
}

export const mockCommunes = async (): Promise<Pick<CommuneModel, 'id' | 'name'>[]> => {
  await delay(150)
  return [
    { id: 1, name: 'Lima' },
    { id: 2, name: 'San Isidro' },
    { id: 3, name: 'Miraflores' },
    { id: 4, name: 'Surco' },
    { id: 5, name: 'La Molina' },
    { id: 6, name: 'Jesus Maria' }
  ]
}

export const mockJobSchedulers = async (): Promise<JobSchedulerModel[]> => {
  await delay(150)
  return [
    { id: 1, name: 'Turno manana' },
    { id: 2, name: 'Turno tarde' },
    { id: 3, name: 'Turno noche' },
    { id: 4, name: 'Jornada completa' }
  ]
}
