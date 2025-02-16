import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { deleteIngredientByIndex } from "../../../services/burger-constructor"
import { useAppDispatch } from "../../../services/hooks"
import { IBurgerIngredientItem } from "../../../services/types"
import DragContainer from "../../dnd/drag-container/drag-container"
import styles from "./constructor-item.module.css"

interface IBurgerConstructorItemProps {
  ingredient: IBurgerIngredientItem
  constructorIngredientIndex?: number | null
}

export default function BurgerConstructorItem({
  ingredient,
  constructorIngredientIndex = null,
}: IBurgerConstructorItemProps): JSX.Element {
  const dispatch = useAppDispatch()

  return (
    <DragContainer
      dragType={ingredient.type === "bun" ? "bun_filled" : "middle_ingredient_filled"}
      ingredient={ingredient}
      constructorIngredientIndex={constructorIngredientIndex}
    >
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
    </DragContainer>
  )
}
