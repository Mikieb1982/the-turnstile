// Make Object.values return the right type for records, so .find(t => t.id) is typed.
interface ObjectConstructor {
  values<T>(o: Record<string, T>): T[]
}
