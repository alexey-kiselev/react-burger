import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { ROUTES } from "../../constants"
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page"
import HomePage from "../../pages/home-page/home-page"
import LoginPage from "../../pages/login-page/login-page"
import OrderInfoPage from "../../pages/order-info-page/order-info-pagee"
import OrdersPage from "../../pages/orders-page/orders-page"
import ProfilePage from "../../pages/profile-page/profile-page"
import RegisterPage from "../../pages/register-page/register-page"
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page"
import { useAppDispatch } from "../../services/hooks"
import { checkUserAuth } from "../../services/user"
import AppHeader from "../app-header/app-header"
import { ProtectedRouteOnlyAuth, ProtectedRouteOnlyUnAuth } from "../protected-route/protected-route"
import "./App.css"
import styles from "./App.module.css"

export default function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(checkUserAuth())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <AppHeader />
      </div>
      <Routes>
        <Route path={ROUTES.HOME_PAGE} element={<HomePage />} />
        <Route path={ROUTES.LOGIN_PAGE} element={<ProtectedRouteOnlyUnAuth component={<LoginPage />} />} />
        <Route path={ROUTES.REGISTER_PAGE} element={<ProtectedRouteOnlyUnAuth component={<RegisterPage />} />} />
        <Route
          path={ROUTES.FORGOT_PASSWORD_PAGE}
          element={<ProtectedRouteOnlyUnAuth component={<ForgotPasswordPage />} />}
        />
        <Route
          path={ROUTES.RESET_PASSWORD_PAGE}
          element={<ProtectedRouteOnlyUnAuth component={<ResetPasswordPage />} />}
        />
        <Route path={ROUTES.PROFILE_PAGE} element={<ProtectedRouteOnlyAuth component={<ProfilePage />} />}>
          <Route path={ROUTES.ORDERS_PAGE} element={<OrdersPage />} />
          <Route path={ROUTES.ORDER_BY_ID_PAGE} element={<OrderInfoPage />} />
        </Route>
      </Routes>
    </div>
  )
}
