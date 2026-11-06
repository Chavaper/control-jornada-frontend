const ROOTS = {
  TASK: '/task',
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
  country: {
    root: `${ROOTS.COUNTRY}/list`,
    list: `${ROOTS.COUNTRY}/list`,
    //add: `${ROOTS.COUNTRY}/add`,
    //edit: (id: string | number) => `${ROOTS.COUNTRY}/add/${id}`
  }
}
