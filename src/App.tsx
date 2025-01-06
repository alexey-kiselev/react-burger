import { useEffect, useState } from "react"
import "./App.css"
import styles from "./App.module.css"
import AppHeader from "./components/app-header/app-header"
import BurgerConstructor from "./components/burger-constructor/burger-constructor"
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients"
import OneMessagePage from "./components/one-message-page/one-message-page"

const ingredientsUrl = "https://norma.nomoreparties.space/api/ingredients"

const infredientsGroups = [
  { title: "Булки", type: "bun" },
  { title: "Соусы", type: "sauce" },
  { title: "Начинки", type: "main" },
]

const burgerConstructor = {
  bun: {
    top: { _id: "643d69a5c3f7b9001cfa093c" }, // Краторная булка N-200i"
    bottom: { _id: "643d69a5c3f7b9001cfa093c" }, // Краторная булка N-200i"
  },
  ingredients: [
    { _id: "643d69a5c3f7b9001cfa0944" }, // Соус традиционный галактический
    { _id: "643d69a5c3f7b9001cfa093f" }, // Мясо бессмертных моллюсков Protostomi
    { _id: "643d69a5c3f7b9001cfa0947" }, // Плоды Фалленианского дерева
    { _id: "643d69a5c3f7b9001cfa0946" }, // Хрустящие минеральные кольца
    { _id: "643d69a5c3f7b9001cfa0946" }, // Хрустящие минеральные кольца
  ],
}

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>()
  const [hasError, setHasError] = useState<boolean>()
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    setIsLoading(true)
    setHasError(undefined)
    setIngredients([])
    fetch(ingredientsUrl)
      .then((res) => res.json())
      .then((data) => {
        setIngredients(data.data)
        setHasError(false)
      })
      .catch(() => setHasError(true))
    setIsLoading(false)
  }, [])

  if (isLoading === true) return <OneMessagePage message="Идёт загрузка, обождите..." />

  if (hasError === true) return <OneMessagePage message="Что-то пошло не так :(" />

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <AppHeader />
      </div>
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.content_burger_ingredients}>
            <BurgerIngredients
              ingredients={ingredients}
              groups={infredientsGroups}
              burgerConstructor={burgerConstructor}
            />
          </div>
          <div className={styles.content_burger_constructor}>
            <BurgerConstructor ingredients={ingredients} burgerConstructor={burgerConstructor} />
          </div>
        </div>
      </div>
    </div>
  )
}
