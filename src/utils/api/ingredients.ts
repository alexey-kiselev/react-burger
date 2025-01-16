import { INGREDIENTS_URL } from "../../constants"
import { getResponse } from "./common"

export const getIngredientsApi = () => {
  return fetch(INGREDIENTS_URL).then(getResponse)
}
