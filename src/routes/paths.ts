const ROOTS = {
  TASK: '/task',
  JUSTIFICATION_TYPE: '/justification-type',
  REGISTER: '/register',
  CONTRACT_TYPE: '/contract-type',
  COUNTRY: '/country'
}

export const paths = {
  home: '/',

  task: {
    root: `${ROOTS.TASK}/list`,
    list: `${ROOTS.TASK}/list`,
    add: `${ROOTS.TASK}/add`,
    edit: (id: string | number) => `${ROOTS.TASK}/add/${id}`
  },
  justificationType: {
    root: `${ROOTS.JUSTIFICATION_TYPE}/list`,
    list: `${ROOTS.JUSTIFICATION_TYPE}/list`,
    add: `${ROOTS.JUSTIFICATION_TYPE}/add`,
    edit: (id: number) => `${ROOTS.JUSTIFICATION_TYPE}/add/${id}`
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
  }
}