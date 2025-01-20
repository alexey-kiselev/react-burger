import { API_INGREDIENTS_URL } from "../../constants"
import { request } from "./common"

export const getIngredientsApi = () => {
  return request(API_INGREDIENTS_URL)
}
