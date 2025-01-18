import { API_INGREDIENTS_URL } from "../../constants"
import { getResponse } from "./common"

export const getIngredientsApi = () => {
  return fetch(API_INGREDIENTS_URL).then(getResponse)
}
