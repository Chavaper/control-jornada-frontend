const ROOTS = {
  TASK: '/task',
  REGISTER: '/register',
  CONTRACT_TYPE: '/contract-type',
  COUNTRY: '/country',
  CITY: '/city',
  COMPANY: '/company'
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
    edit: (id: string | number) => `${ROOTS.CONTRACT_TYPE}/add/${id}`
  },

  country: {
    root: `${ROOTS.COUNTRY}/list`,
    list: `${ROOTS.COUNTRY}/list`,
    add: `${ROOTS.COUNTRY}/add`,
    edit: (id: string | number) => `${ROOTS.COUNTRY}/add/${id}`
  },

  city: {
    root: `${ROOTS.CITY}/list`,
    list: `${ROOTS.CITY}/list`,
    add: `${ROOTS.CITY}/add`,
    edit: (id: string | number) => `${ROOTS.CITY}/add/${id}`
  },

  company: {
    root: `${ROOTS.COMPANY}/list`,
    list: `${ROOTS.COMPANY}/list`,
    add: `${ROOTS.COMPANY}/add`,
    edit: (id: string | number) => `${ROOTS.COMPANY}/add/${id}`
  }
}