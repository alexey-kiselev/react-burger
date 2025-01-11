import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { IBurgerIngredientItem } from "../../burger-ingredients/burger-ingredients"
import styles from "./constructor-item.module.css"

export default function BurgerConstructorItem({ ingredient }: { ingredient: IBurgerIngredientItem }) {
  return (
    <div className={styles.burger_constructor_item}>
      <DragIcon type="primary" className={styles.burger_constructor_drag_icon} />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        key={ingredient._id}
      />
    </div>
  )
}
