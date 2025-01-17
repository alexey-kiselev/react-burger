import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { deleteIngredientByIndex } from "../../../services/burger-constructor/reducers"
import { useAppDispatch } from "../../../services/hooks"
import { IBurgerIngredientItem } from "../../../services/types"
import styles from "./constructor-item.module.css"

export default function BurgerConstructorItem({
  ingredient,
  constructorIngredientIndex = null,
}: {
  ingredient: IBurgerIngredientItem
  constructorIngredientIndex: number | null
}) {
  const dispatch = useAppDispatch()

  return (
    <div className={styles.burger_constructor_item}>
      <DragIcon type="primary" className={styles.burger_constructor_drag_icon} />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => {
          constructorIngredientIndex !== null && dispatch(deleteIngredientByIndex(constructorIngredientIndex))
        }}
      />
    </div>
  )
}
