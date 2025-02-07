import { useEffect } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { ROUTES } from "../../constants"
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page"
import HomePage from "../../pages/home-page/home-page"
import LoginPage from "../../pages/login-page/login-page"
import NotFound404Page from "../../pages/not-found-404-page/not-found-404-page"
import OrderInfoPage from "../../pages/order-info-page/order-info-pagee"
import OrdersPage from "../../pages/orders-page/orders-page"
import ProfilePage from "../../pages/profile-page/profile-page"
import RegisterPage from "../../pages/register-page/register-page"
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page"
import { useAppDispatch } from "../../services/hooks"
import { getIngredients } from "../../services/ingredients"
import { cleanupSelectedIngredient } from "../../services/selected-ingredient"
import { checkUserAuth } from "../../services/user"
import AppHeader from "../app-header/app-header"
import { IngredientDetails } from "../ingredient-details/ingredient-details"
import ModalOverlay from "../modal-overlay/modal-overlay"
import Modal from "../modal/modal"
import { ProtectedRouteOnlyAuth, ProtectedRouteOnlyUnAuth } from "../protected-route/protected-route"
import "./App.css"
import styles from "./App.module.css"

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const background = location.state && location.state.background
  const dispatch = useAppDispatch()

  const handleModalClose = () => {
    dispatch(cleanupSelectedIngredient())
    navigate(-1)
  }

  useEffect(() => {
    dispatch(checkUserAuth())
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <AppHeader />
      </div>
      <Routes location={background || location}>
        <Route path={ROUTES.HOME_PAGE} element={<HomePage />} />
        <Route path={ROUTES.LOGIN_PAGE} element={<ProtectedRouteOnlyUnAuth component={<LoginPage />} />} />
        <Route path={ROUTES.REGISTER_PAGE} element={<ProtectedRouteOnlyUnAuth component={<RegisterPage />} />} />
        <Route
          path={ROUTES.INGREDIENT_BY_ID_PAGE}
          element={
            <div className={styles.ingredient_container}>
              <IngredientDetails />
            </div>
          }
        />
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
        <Route path="*" element={<NotFound404Page />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path={ROUTES.INGREDIENT_BY_ID_PAGE}
            element={
              <>
                <Modal title="Детали ингредиента" onClose={handleModalClose}>
                  <IngredientDetails />
                </Modal>
                <ModalOverlay />
              </>
            }
          />
        </Routes>
      )}
    </div>
  )
}
