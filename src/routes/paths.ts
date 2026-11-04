const ROOTS = {
  TASK: '/task',
  REGISTER: '/register',
  CONTRACT_TYPE: '/contract-type',
  COUNTRY: '/country',
  MARITAL_STATUS: '/maritalStatus',
  EMPLOYEE: '/employee'
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
  maritalStatus: {
    root: `${ROOTS.MARITAL_STATUS}/list`,
    list: `${ROOTS.MARITAL_STATUS}/list`,
    add: `${ROOTS.MARITAL_STATUS}/add`,
    edit: (id: string | number) => `${ROOTS.MARITAL_STATUS}/add/${id}`
  },
  employee: {
    root: `${ROOTS.EMPLOYEE}/list`,
    list: `${ROOTS.EMPLOYEE}/list`,
    add: `${ROOTS.EMPLOYEE}/add`,
    edit: (id: string | number) => `${ROOTS.EMPLOYEE}/add/${id}`
  }
}