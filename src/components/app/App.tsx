import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { ROUTES } from "../../constants"
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page"
import HomePage from "../../pages/home-page/home-page"
import LoginPage from "../../pages/login-page/login-page"
import OrdersPage from "../../pages/orders-page/orders-page"
import ProfilePage from "../../pages/profile-page/profile-page"
import RegisterPage from "../../pages/register-page/register-page"
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page"
import { useAppDispatch, useAppSelector } from "../../services/hooks"
import { getIngredients, selectIngredientsState } from "../../services/ingredients"
import AppHeader from "../app-header/app-header"
import Loader from "../loader/loader"
import OneMessagePage from "../one-message-page/one-message-page"
import "./App.css"
import styles from "./App.module.css"

export default function App() {
  const { loading, error } = useAppSelector(selectIngredientsState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  if (loading) {
    return (
      <OneMessagePage>
        <Loader>
          <p className={styles.data_is_loading}>Идёт загрузка, обождите..</p>
        </Loader>
      </OneMessagePage>
    )
  }

  if (error)
    return (
      <OneMessagePage>
        <p className={styles.error_message}>Что-то пошло не так :(</p>
      </OneMessagePage>
    )

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <AppHeader />
      </div>
      <Routes>
        <Route path={ROUTES.HOME_PAGE} element={<HomePage />} />
        <Route path={ROUTES.LOGIN_PAGE} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER_PAGE} element={<RegisterPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD_PAGE} element={<ForgotPasswordPage />} />
        <Route path={ROUTES.RESET_PASSWORD_PAGE} element={<ResetPasswordPage />} />
        <Route path={ROUTES.PROFILE_PAGE} element={<ProfilePage />} />
        <Route path={ROUTES.ORDERS_PAGE} element={<OrdersPage />} />
      </Routes>
    </div>
  )
}
