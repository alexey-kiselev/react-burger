export const getResponse = (response: Response) => {
  return response.ok ? response.json() : Promise.reject(response.status)
}

export const request = (url: string, options: RequestInit | undefined = undefined) => {
  return fetch(url, options).then(getResponse)
}
