import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../services/hooks"
import { selectIngredients } from "../../services/ingredients/reducers"
import {
  cleanupSelectedIngredient,
  selectSelectedIngredient,
  setSelectedIngredient,
} from "../../services/selected-ingredient/reducers"
import { IBurgerIngredientGroup, IBurgerIngredientItem } from "../../services/types"
import { IngredientDetails } from "../ingredient-details/ingredient-details"
import ModalOverlay from "../modal-overlay/modal-overlay"
import Modal from "../modal/modal"
import styles from "./burger-ingredients.module.css"
import BurgerIngredientsGroup from "./ingredients-group/ingredients-group"

const groups: IBurgerIngredientGroup[] = [
  { title: "Булки", type: "bun" },
  { title: "Соусы", type: "sauce" },
  { title: "Начинки", type: "main" },
]

export default function BurgerIngredients() {
  const [currentGroup, setCurrentGroup] = useState(groups[0].type)
  const [isVisibleIngredientDetails, setIsVisibleIngredientDetails] = useState(false)
  const ingredients = useAppSelector(selectIngredients)
  const selectedIngredient = useAppSelector(selectSelectedIngredient)
  const dispatch = useAppDispatch()

  const handleClickIngredient = (ingredient: IBurgerIngredientItem) => {
    dispatch(setSelectedIngredient(ingredient))
    setIsVisibleIngredientDetails(true)
  }

  const handleCloseDetails = () => {
    setIsVisibleIngredientDetails(false)
    dispatch(cleanupSelectedIngredient())
  }

  return (
    <div className={styles.component}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <div className={styles.tabs}>
        {groups.map((group) => (
          <Tab value={group.type} active={currentGroup === group.type} onClick={setCurrentGroup} key={group.type}>
            {group.title}
          </Tab>
        ))}
      </div>
      <div className={styles.groups}>
        {groups.map((group) => (
          <BurgerIngredientsGroup
            group={group}
            ingredients={ingredients.filter((ingredient) => ingredient.type === group.type)}
            key={group.type}
            onClickIngredient={handleClickIngredient}
          />
        ))}
      </div>
      {isVisibleIngredientDetails && (
        <>
          <Modal title="Детали ингредиента" onClose={handleCloseDetails}>
            <IngredientDetails ingredient={selectedIngredient!} />
          </Modal>
          <ModalOverlay />
        </>
      )}
    </div>
  )
}
