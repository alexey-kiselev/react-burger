import { API_FORGOT_PASSWORD_URL } from "../../constants"
import { request } from "./common"

interface IForgotPasswordApiProps {
  email: string
}

interface IForgotPasswordApiResponse {
  success: boolean
  message: string
}

export async function forgotPasswordApi({ email }: IForgotPasswordApiProps): Promise<IForgotPasswordApiResponse> {
  const url = API_FORGOT_PASSWORD_URL
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  }
  return request<IForgotPasswordApiResponse>({ url, options })
}

interface IResetPasswordApiProps {
  password: string
  code: string
}

interface IResetPasswordApiResponse {
  success: boolean
  message: string
}

export async function resetPasswordApi({ password, code }: IResetPasswordApiProps): Promise<IResetPasswordApiResponse> {
  const url = API_FORGOT_PASSWORD_URL
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, token: code }),
  }
  return request<IResetPasswordApiResponse>({ url, options })
}
