import {
  API_AUTH_LOGIN_URL,
  API_AUTH_LOGOUT_URL,
  API_AUTH_REGISTER_URL,
  API_AUTH_TOKEN_URL,
  API_AUTH_USER_INFO_URL,
} from "../../constants"
import { IUser } from "../../services/types"
import { request } from "./common"

export const refreshToken = async () => {
  const refreshData = await request(API_AUTH_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
  if (!refreshData.success) {
    return Promise.reject(refreshData)
  }
  localStorage.setItem("refreshToken", refreshData.refreshToken)
  localStorage.setItem("accessToken", refreshData.accessToken)
  return refreshData
}

export const fetchWithRefresh = async (url: string, options: RequestInit | undefined = undefined) => {
  try {
    const response = await request(url, options)
    return response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken()
      options = { ...options, headers: { ...options?.headers, Authorization: refreshData.accessToken } }
      return request(url, options)
    } else {
      return Promise.reject(err)
    }
  }
}

export const authRegisterApi = async ({
  email,
  password,
  name,
}: {
  email: string
  password: string
  name: string
}): Promise<IUser> => {
  const data = await request(API_AUTH_REGISTER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({ email: email, password: password, name: name }),
  })
  localStorage.setItem("accessToken", data.accessToken)
  localStorage.setItem("refreshToken", data.refreshToken)
  const user: IUser = data.user
  return user
}

export const authGetUser = async (): Promise<IUser> => {
  try {
    const data = await fetchWithRefresh(API_AUTH_USER_INFO_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    })
    const user: IUser = data.user
    return user
  } catch (error) {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    throw error
  }
}

export const authLoginApi = async ({ email, password }: { email: string; password: string }): Promise<IUser> => {
  const data = await request(API_AUTH_LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({ email: email, password: password }),
  })
  localStorage.setItem("accessToken", data.accessToken)
  localStorage.setItem("refreshToken", data.refreshToken)
  const user: IUser = data.user
  return user
}

export const authLogoutApi = async (): Promise<void> => {
  request(API_AUTH_LOGOUT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  })
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
}

export const authUpdateUser = async ({
  name,
  email,
  password,
}: {
  name: string
  email: string
  password: string
}): Promise<IUser> => {
  const data = await fetchWithRefresh(API_AUTH_USER_INFO_URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({ email: email, password: password, name: name }),
  })
  const user: IUser = data.user
  return user
}
