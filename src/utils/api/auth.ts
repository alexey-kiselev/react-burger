import { API_AUTH_LOGIN_URL, API_AUTH_LOGOUT_URL, API_AUTH_REGISTER_URL, API_AUTH_USER_INFO_URL } from "../../constants"
import { IUser } from "../../services/types"
import { request } from "./common"

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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password, name: name }),
  })
  localStorage.setItem("accessToken", data.accessToken)
  localStorage.setItem("refreshToken", data.refreshToken)
  const user: IUser = data.user
  return user
}

export const authGetUser = async (): Promise<IUser> => {
  try {
    const data = await request(API_AUTH_USER_INFO_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `${localStorage.getItem("accessToken")}` },
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
    headers: { "Content-Type": "application/json" },
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
    headers: { "Content-Type": "application/json" },
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
  const data = await request(API_AUTH_USER_INFO_URL, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `${localStorage.getItem("accessToken")}` },
    body: JSON.stringify({ email: email, password: password, name: name }),
  })
  const user: IUser = data.user
  return user
}
