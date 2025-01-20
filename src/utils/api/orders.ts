import { API_ORDERS_URL } from "../../constants"
import { request } from "./common"

export const createOrderApi = (ingredientsIDs: string[]) => {
  return request(API_ORDERS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients: ingredientsIDs }),
  })
}
