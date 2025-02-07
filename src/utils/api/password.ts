import { API_FORGOT_PASSWORD_URL } from "../../constants"
import { request } from "./common"

export const forgotPasswordApi = (email: string) => {
  return request(API_FORGOT_PASSWORD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email }),
  })
}

export const resetPasswordApi = (password: string, code: string) => {
  return request(API_FORGOT_PASSWORD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: password, token: code }),
  })
}
