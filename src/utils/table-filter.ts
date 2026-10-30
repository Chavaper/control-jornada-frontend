export type Order = 'asc' | 'desc'

export function getComparator<T>(order: Order, orderBy: keyof T) {
  return (a: T, b: T) => {
    const valueA = a[orderBy]
    const valueB = b[orderBy]
    if (valueA === valueB) return 0
    const result = valueA > valueB ? 1 : -1
    return order === 'asc' ? result : -result
  }
}

export function includesText(value: string | null | undefined, text: string) {
  return (value ?? '').toLowerCase().includes(text.trim().toLowerCase())
}
