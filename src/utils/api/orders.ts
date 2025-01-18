import { API_ORDERS_URL } from "../../constants"
import { getResponse } from "./common"

export const createOrderApi = async () => {
  const response = await fetch(API_ORDERS_URL)
  return getResponse(response)
}
