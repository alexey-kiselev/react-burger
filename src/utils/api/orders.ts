import { API_ORDERS_URL } from "../../constants"
import { getResponse } from "./common"

export const createOrderApi = (ingredientsIDs: string[]) => {
  const requestBody = { ingredients: ingredientsIDs }
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  }
  return fetch(API_ORDERS_URL, requestOptions).then(getResponse)
}
