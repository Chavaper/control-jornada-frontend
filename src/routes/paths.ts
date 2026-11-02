const ROOTS = {
  TASK: '/task',
  COUNTRY: '/country',
  MARITAL_STATUS: '/maritalStatus'
}

export const paths = {
  home: '/',
  task: {
    root: `${ROOTS.TASK}/list`,
    list: `${ROOTS.TASK}/list`,
    add: `${ROOTS.TASK}/add`,
    edit: (id: string | number) => `${ROOTS.TASK}/add/${id}`
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
  }
}
