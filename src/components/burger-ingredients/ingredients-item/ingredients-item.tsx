import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useDrag } from "react-dnd"
import { Link, useLocation } from "react-router-dom"
import { ROUTES } from "../../../constants"
import { IBurgerIngredientItem, IBurgerItemDragItem } from "../../../services/types"
import styles from "./ingredients-item.module.css"

export default function BurgerIngredientsItem({
  ingredient,
  count,
}: {
  ingredient: IBurgerIngredientItem
  count: number
}) {
  const [{ isDragging }, refDrag] = useDrag({
    type: ingredient.type === "bun" ? "bun" : "middle_ingredient",
    item: { ingredient: ingredient, constructorIngredientIndex: null } satisfies IBurgerItemDragItem,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })
  const location = useLocation()

  return (
    <div ref={refDrag} style={{ opacity: isDragging ? 0.5 : 1.0 }} className={styles.component}>
      <Link
        key={ingredient._id}
        to={ROUTES.INGREDIENT_BY_ID_PAGE.replace(":id", ingredient._id)}
        state={{ background: location }}
        className={styles.link}
      >
        <img className={styles.image} src={ingredient.image} alt={ingredient.name} />
        <div className={styles.price_line}>
          <span className={styles.price_number}>{ingredient.price}</span>
          <CurrencyIcon className={styles.price_currency} type="primary" />
        </div>
        <p className={styles.name}>{ingredient.name}</p>
        {count > 0 && <Counter count={count} size="default" extraClass={styles.counter} />}
      </Link>
    </div>
  )
}
