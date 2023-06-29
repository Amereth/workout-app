// extracts the first query param from a string or string array

export function queryParamsToString(queryParams: string | string[]): string {
  if (Array.isArray(queryParams)) return queryParams[0] ?? ''

  return queryParams
}
