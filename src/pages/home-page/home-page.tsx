import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import BurgerConstructor from "../../components/burger-constructor/burger-constructor"
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients"
import Loader from "../../components/loader/loader"
import OneMessagePage from "../../components/one-message-page/one-message-page"
import { useAppSelector } from "../../services/hooks"
import { selectIngredientsState } from "../../services/ingredients"
import styles from "./home-page.module.css"

const HomePage = () => {
  const { loading, error } = useAppSelector(selectIngredientsState)

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
    <DndProvider backend={HTML5Backend}>
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
  )
}

export default HomePage
