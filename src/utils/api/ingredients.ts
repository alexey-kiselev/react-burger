import { API_INGREDIENTS_URL } from "../../constants"
import { getResponse } from "./common"

export const getIngredientsApi = async () => {
  const response = await fetch(API_INGREDIENTS_URL)
  return getResponse(response)
}
