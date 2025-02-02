import { API_AUTH_REGISTER_URL } from "../../constants"
import { request } from "./common"

export const authRegisterApi = ({ email, password, name }: { email: string; password: string; name: string }) => {
  return request(API_AUTH_REGISTER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password, name: name }),
  })
}
