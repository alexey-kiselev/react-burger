export const getResponse = (response: Response) => {
  return response.ok ? response.json() : Promise.reject(response.status)
}
