const ROOTS = {
  TASK: '/task',
  JUSTIFICATION_TYPE: '/justification-type'
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
  }
}
