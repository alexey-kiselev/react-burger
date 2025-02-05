import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { ROUTES } from "../../constants"
import { useAppSelector } from "../../services/hooks"
import { getIsAuthChecked, getUser } from "../../services/user"
import Loader from "../loader/loader"
import OneMessagePage from "../one-message-page/one-message-page"
import styles from "./protected-route.module.css"

type TProtectedProps = {
  onlyUnAuth?: boolean
  component: React.JSX.Element
}

const ProtectedRouteElement = ({ onlyUnAuth = false, component }: TProtectedProps): React.JSX.Element => {
  const isAuthChecked = useAppSelector(getIsAuthChecked)
  const user = useAppSelector(getUser)
  const location = useLocation()

  if (!isAuthChecked) {
    return (
      <OneMessagePage>
        <Loader>
          <p className={styles.data_is_loading}>Идёт загрузка, обождите..</p>
        </Loader>
      </OneMessagePage>
    )
  }

  if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: ROUTES.HOME_PAGE } }
    return <Navigate to={from} />
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={ROUTES.LOGIN_PAGE} state={{ from: location }} />
  }

  return component
}

export const ProtectedRouteOnlyAuth = ProtectedRouteElement
export const ProtectedRouteOnlyUnAuth = ({ component }: { component: React.JSX.Element }): React.JSX.Element => (
  <ProtectedRouteElement onlyUnAuth={true} component={component} />
)
