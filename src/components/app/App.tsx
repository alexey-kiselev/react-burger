import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import HomePage from "../../pages/home-page/home-page"
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
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}
