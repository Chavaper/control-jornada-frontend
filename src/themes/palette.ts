export const grey = {
  50: '#FCFDFD',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24'
}

export const palette = {
  primary: {
    light: '#4F6FD6',
    main: '#153BAA',
    dark: '#0C2675',
    contrastText: '#FFFFFF'
  },
  secondary: {
    light: '#64B5F6',
    main: '#1565C0',
    dark: '#0D47A1',
    contrastText: '#FFFFFF'
  },
  success: { main: '#22C55E', contrastText: '#FFFFFF' },
  warning: { main: '#FFAB00', contrastText: '#212B36' },
  error: { main: '#FF5630', contrastText: '#FFFFFF' },
  info: { main: '#00B8D9', contrastText: '#FFFFFF' },
  grey,
  text: {
    primary: grey[800],
    secondary: grey[600],
    disabled: grey[500]
  },
  background: {
    default: grey[100],
    paper: '#FFFFFF'
  },
  divider: grey[300]
}
