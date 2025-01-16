import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../services/hooks"
import { getIngredients } from "../../services/ingredients/actions"
import { selectIngredientsState } from "../../services/ingredients/reducers"
import AppHeader from "../app-header/app-header"
import BurgerConstructor from "../burger-constructor/burger-constructor"
import BurgerIngredients from "../burger-ingredients/burger-ingredients"
import OneMessagePage from "../one-message-page/one-message-page"
import "./App.css"
import styles from "./App.module.css"

const burgerConstructor = {
  bun: { _id: "643d69a5c3f7b9001cfa093c" }, // Краторная булка N-200i"
  ingredients: [
    { _id: "643d69a5c3f7b9001cfa0944" }, // Соус традиционный галактический
    { _id: "643d69a5c3f7b9001cfa093f" }, // Мясо бессмертных моллюсков Protostomi
    { _id: "643d69a5c3f7b9001cfa0947" }, // Плоды Фалленианского дерева
    { _id: "643d69a5c3f7b9001cfa0946" }, // Хрустящие минеральные кольца
    { _id: "643d69a5c3f7b9001cfa0946" }, // Хрустящие минеральные кольца
  ],
}

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
      <div className={styles.header}>
        <AppHeader />
      </div>
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.content_burger_ingredients}>
            <BurgerIngredients burgerConstructor={burgerConstructor} />
          </div>
          <div className={styles.content_burger_constructor}>
            <BurgerConstructor burgerConstructor={burgerConstructor} />
          </div>
        </div>
      </div>
    </div>
  )
}
