'use client'

import Link, { LinkProps } from 'next/link'
import { forwardRef } from 'react'

const RouterLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link ref={ref} {...props} />
))

RouterLink.displayName = 'RouterLink'

export default RouterLink
