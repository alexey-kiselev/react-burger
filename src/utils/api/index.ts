import { authGetUser, authLoginApi, authLogoutApi, authRegisterApi, authUpdateUser } from "./auth"
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
  auth: {
    login: authLoginApi,
    logout: authLogoutApi,
    register: authRegisterApi,
    getUser: authGetUser,
    updateUserInfo: authUpdateUser,
  },
}

export default api
