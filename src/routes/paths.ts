const ROOTS = {
  TASK: '/task',
  CONTRACT_TYPE: '/contract-type'
}

export const paths = {
  home: '/',

  task: {
    root: `${ROOTS.TASK}/list`,
    list: `${ROOTS.TASK}/list`,
    add: `${ROOTS.TASK}/add`,
    edit: (id: string | number) => `${ROOTS.TASK}/add/${id}`
  },

  contractType: {
    root: `${ROOTS.CONTRACT_TYPE}/list`,
    list: `${ROOTS.CONTRACT_TYPE}/list`,
    add: `${ROOTS.CONTRACT_TYPE}/add`,
    edit: (id: string | number) =>
      `${ROOTS.CONTRACT_TYPE}/add/${id}`
  }
}
