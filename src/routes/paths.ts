const ROOTS = {
  TASK: '/task',
  REGISTER: '/register',
  CONTRACT_TYPE: '/contract-type',
  COUNTRY: '/country',
  BRANCH: '/branch',
  JOB_TYPE: '/job-type'
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

  branch: {
    root: `${ROOTS.BRANCH}/list`,
    list: `${ROOTS.BRANCH}/list`,
    add: `${ROOTS.BRANCH}/add`,
    edit: (id: string | number) => `${ROOTS.BRANCH}/add/${id}`
  },

  jobType: {
    root: `${ROOTS.JOB_TYPE}/list`,
    list: `${ROOTS.JOB_TYPE}/list`,
    add: `${ROOTS.JOB_TYPE}/add`,
    edit: (id: string | number) => `${ROOTS.JOB_TYPE}/add/${id}`
  }
}
