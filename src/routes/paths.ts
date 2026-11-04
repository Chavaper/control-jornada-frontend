const ROOTS = {
  TASK: '/task',
  REGISTER: '/register',
  CONTRACT_TYPE: '/contract-type',
  COUNTRY: '/country',
  REGION: '/region',
  JUSTIFICATION: '/justification',
  CITY: '/city',
  JUSTIFICATION_TYPE: '/justification-type',
}

export const paths = {
  home: '/',

  task: {
    root: `${ROOTS.TASK}/list`,
    list: `${ROOTS.TASK}/list`,
    add: `${ROOTS.TASK}/add`,
    edit: (id: string | number) => `${ROOTS.TASK}/add/${id}`
  },

  register: {
    root: `${ROOTS.REGISTER}/list`,
    list: `${ROOTS.REGISTER}/list`,
    add: `${ROOTS.REGISTER}/add`,
    edit: (id: string | number) => `${ROOTS.REGISTER}/add/${id}`
  },

  contractType: {
    root: `${ROOTS.CONTRACT_TYPE}/list`,
    list: `${ROOTS.CONTRACT_TYPE}/list`,
    add: `${ROOTS.CONTRACT_TYPE}/add`,
    edit: (id: string | number) =>
      `${ROOTS.CONTRACT_TYPE}/add/${id}`
  },

  country: {
    root: `${ROOTS.COUNTRY}/list`,
    list: `${ROOTS.COUNTRY}/list`,
    add: `${ROOTS.COUNTRY}/add`,
    edit: (id: string | number) => `${ROOTS.COUNTRY}/add/${id}`
  },
  region: {
    root: `${ROOTS.REGION}/list`,
    list: `${ROOTS.REGION}/list`,
    add: `${ROOTS.REGION}/add`,
    edit: (id: string | number) => `${ROOTS.REGION}/add/${id}`
  },
  justification: {
    root: `${ROOTS.JUSTIFICATION}/list`,
    list: `${ROOTS.JUSTIFICATION}/list`,
    add: `${ROOTS.JUSTIFICATION}/add`,
    edit: (id: string | number) => `${ROOTS.JUSTIFICATION}/add/${id}`
  },
  city: {
    root: `${ROOTS.CITY}/list`,
    list: `${ROOTS.CITY}/list`,
    add: `${ROOTS.CITY}/add`,
    edit: (id: string | number) => `${ROOTS.CITY}/add/${id}`
  },
  justificationType: {
    root: `${ROOTS.JUSTIFICATION_TYPE}/list`,
    list: `${ROOTS.JUSTIFICATION_TYPE}/list`,
    add: `${ROOTS.JUSTIFICATION_TYPE}/add`,
    edit: (id: number) => `${ROOTS.JUSTIFICATION_TYPE}/add/${id}`
  },
}