import { Public_Sans } from 'next/font/google'

export const primaryFont = Public_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap'
})

export const typography = {
  fontFamily: primaryFont.style.fontFamily,
  h4: { fontWeight: 700 },
  h6: { fontWeight: 700 },
  button: { textTransform: 'none' as const, fontWeight: 600 }
}
