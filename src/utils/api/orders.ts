import { API_ORDERS_URL } from "../../constants"
import { request } from "./common"

interface ICreateOrderApiProps {
  ingredientsIDs: string[]
}

export interface IOrder {
  name: string
  order: {
    number: number
  }
  success: boolean
}

export async function createOrderApi({ ingredientsIDs }: ICreateOrderApiProps): Promise<IOrder> {
  const url = API_ORDERS_URL
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `${localStorage.getItem("accessToken")}` },
    body: JSON.stringify({ ingredients: ingredientsIDs }),
  }
  return request<IOrder>({ url, options })
}
