export const getResponse = (response: Response) => {
  return response.ok ? response.json() : response.json().then((err) => Promise.reject(err))
}

export const request = (url: string, options: RequestInit | undefined = undefined) => {
  return fetch(url, options).then(getResponse)
}
