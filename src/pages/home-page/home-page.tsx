import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import BurgerConstructor from "../../components/burger-constructor/burger-constructor"
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients"
import styles from "./home-page.module.css"

const HomePage = () => {
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
