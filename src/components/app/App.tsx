import { useEffect } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useAppDispatch, useAppSelector } from "../../services/hooks"
import { getIngredients } from "../../services/ingredients/actions"
import { selectIngredientsState } from "../../services/ingredients/reducers"
import AppHeader from "../app-header/app-header"
import BurgerConstructor from "../burger-constructor/burger-constructor"
import BurgerIngredients from "../burger-ingredients/burger-ingredients"
import OneMessagePage from "../one-message-page/one-message-page"
import "./App.css"
import styles from "./App.module.css"

export default function App() {
  const { loading, error } = useAppSelector(selectIngredientsState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  if (loading) return <OneMessagePage message="Идёт загрузка, обождите..." />

  if (error) return <OneMessagePage message="Что-то пошло не так :(" />

  return (
    <div className={styles.app}>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.header}>
          <AppHeader />
        </div>
        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.content_burger_ingredients}>
              <BurgerIngredients />
            </div>
            <div className={styles.content_burger_constructor}>
              <BurgerConstructor />
            </div>
          </div>
        </div>
      </DndProvider>
    </div>
  )
}
