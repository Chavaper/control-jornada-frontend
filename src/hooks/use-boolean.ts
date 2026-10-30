import { useCallback, useState } from 'react'

interface ReturnType {
  value: boolean
  onTrue: () => void
  onFalse: () => void
  onToggle: () => void
}

export function useBoolean(defaultValue = false): ReturnType {
  const [value, setValue] = useState(defaultValue)

  const onTrue = useCallback(() => setValue(true), [])
  const onFalse = useCallback(() => setValue(false), [])
  const onToggle = useCallback(() => setValue((prev) => !prev), [])

  return { value, onTrue, onFalse, onToggle }
}
