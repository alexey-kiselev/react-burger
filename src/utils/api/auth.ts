import {
  API_AUTH_LOGIN_URL,
  API_AUTH_LOGOUT_URL,
  API_AUTH_REGISTER_URL,
  API_AUTH_TOKEN_URL,
  API_AUTH_USER_INFO_URL,
} from "../../constants"
import { IUser } from "../../services/types"
import { IRequestProps, request } from "./common"

interface IRefreshTokenResponse {
  success: boolean
  accessToken: string
  refreshToken: string
}

export async function refreshToken(): Promise<IRefreshTokenResponse> {
  const url = API_AUTH_TOKEN_URL
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }
  const refreshData = await request<IRefreshTokenResponse>({ url, options })
  if (!refreshData.success) {
    return Promise.reject(refreshData)
  }
  localStorage.setItem("refreshToken", refreshData.refreshToken)
  localStorage.setItem("accessToken", refreshData.accessToken)
  return refreshData
}

export async function fetchWithRefresh<T>({ url, options = undefined }: IRequestProps): Promise<T> {
  try {
    const response = await request<T>({ url, options })
    return response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken()
      options = { ...options, headers: { ...options?.headers, Authorization: refreshData.accessToken } }
      return request<T>({ url, options })
    } else {
      return Promise.reject(err)
    }
  }
}

interface IAuthRegisterApiProps {
  email: string
  password: string
  name: string
}

interface IAuthRegisterApiReponse {
  success: boolean
  accessToken: string
  refreshToken: string
  user: IUser
}

export async function authRegisterApi({ email, password, name }: IAuthRegisterApiProps): Promise<IUser> {
  const url = API_AUTH_REGISTER_URL
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({ email, password, name }),
  }
  const data = await request<IAuthRegisterApiReponse>({ url, options })
  localStorage.setItem("accessToken", data.accessToken)
  localStorage.setItem("refreshToken", data.refreshToken)
  const user: IUser = data.user
  return user
}

interface IAuthGetUserResponse {
  success: boolean
  user: IUser
}

export async function authGetUser(): Promise<IUser> {
  try {
    const url = API_AUTH_USER_INFO_URL
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    }
    const data = await fetchWithRefresh<IAuthGetUserResponse>({ url, options })
    const user: IUser = data.user
    return user
  } catch (error) {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    throw error
  }
}

interface IAuthLoginApiProps {
  email: string
  password: string
}

interface IAuthLoginApiResponse {
  success: boolean
  accessToken: string
  refreshToken: string
  user: IUser
}

export async function authLoginApi({ email, password }: IAuthLoginApiProps): Promise<IUser> {
  const url = API_AUTH_LOGIN_URL
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({ email, password }),
  }
  const data = await request<IAuthLoginApiResponse>({ url, options })
  localStorage.setItem("accessToken", data.accessToken)
  localStorage.setItem("refreshToken", data.refreshToken)
  const user: IUser = data.user
  return user
}

interface IAuthLogoutApiResponse {
  success: boolean
  message: string
}

export async function authLogoutApi(): Promise<boolean> {
  const url = API_AUTH_LOGOUT_URL
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  }
  const data = await request<IAuthLogoutApiResponse>({ url, options })
  if (data.success) {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    return true
  }
  return false
}

interface IAuthUpdateUserProps {
  name: string
  email: string
  password: string
}

interface IAuthUpdateUserResponse {
  success: boolean
  user: IUser
}

export async function authUpdateUser({ name, email, password }: IAuthUpdateUserProps): Promise<IUser> {
  const url = API_AUTH_USER_INFO_URL
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({ email, password, name }),
  }
  const data = await fetchWithRefresh<IAuthUpdateUserResponse>({ url, options })
  if (!data.success) {
    throw Error("Can't update user info")
  }
  const user: IUser = data.user
  return user
}
