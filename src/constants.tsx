export const API_BASE_URL = "https://norma.nomoreparties.space/api"
export const API_INGREDIENTS_URL = `${API_BASE_URL}/ingredients`
export const API_ORDERS_URL = `${API_BASE_URL}/orders`
export const API_FORGOT_PASSWORD_URL = `${API_BASE_URL}/password-reset`
export const API_RESET_PASSWORD_URL = `${API_BASE_URL}/password-reset/reset`
export const API_AUTH_LOGIN_URL = `${API_BASE_URL}/auth/login`
export const API_AUTH_REGISTER_URL = `${API_BASE_URL}/auth/register`
export const API_AUTH_LOGINT_URL = `${API_BASE_URL}/auth/logout`
export const API_AUTH_TOKEN_URL = `${API_BASE_URL}/auth/token`

export const ROUTES = {
  HOME_PAGE: "/",
  LOGIN_PAGE: "/login",
  LOGOUT_PAGE: "/logout",
  REGISTER_PAGE: "/register",
  FORGOT_PASSWORD_PAGE: "/forgot-password",
  RESET_PASSWORD_PAGE: "/reset-password",
  PROFILE_PAGE: "/profile",
  ORDERS_PAGE: "/profile/orders",
  ORDER_BY_ID_PAGE: "/profile/orders/:id",
  INGREDIENT_BY_ID_PAGE: "/ingredients/:id",
}
