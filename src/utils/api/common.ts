export interface IRequestProps {
  url: string
  options?: RequestInit | undefined
}

export async function request<T>({ url, options = undefined }: IRequestProps): Promise<T> {
  const response = await fetch(url, options)
  return response.ok ? response.json() : response.json().then((err) => Promise.reject(err))
}
