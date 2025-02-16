import { API_INGREDIENTS_URL } from "../../constants"
import { IBurgerIngredientItem } from "../../services/types"
import { request } from "./common"

interface IGetIngredientsApiResponse {
  data: IBurgerIngredientItem[]
}

export async function getIngredientsApi(): Promise<IGetIngredientsApiResponse> {
  return request<IGetIngredientsApiResponse>({ url: API_INGREDIENTS_URL })
}
