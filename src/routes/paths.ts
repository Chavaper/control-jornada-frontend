const ROOTS = {
  TASK: '/task',
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
