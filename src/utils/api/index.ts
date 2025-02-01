import { getIngredientsApi } from "./ingredients"
import { createOrderApi } from "./orders"
import { forgotPasswordApi, resetPasswordApi } from "./password"

const api = {
  ingredients: {
    getIngredients: getIngredientsApi,
  },
  orders: {
    createOrder: createOrderApi,
  },
  password: {
    forgot: forgotPasswordApi,
    reset: resetPasswordApi,
  },
}

export default api
