const ROOTS = {
  REGION: '/region'
}

export const regionPaths = {
  home: '/',
  region: {
    root: `${ROOTS.REGION}/list`,
    list: `${ROOTS.REGION}/list`,
    add: `${ROOTS.REGION}/add`,
    edit: (id: string | number) => `${ROOTS.REGION}/add/${id}`
  }
}