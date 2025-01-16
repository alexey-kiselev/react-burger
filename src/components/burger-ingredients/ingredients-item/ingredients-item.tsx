import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { IBurgerIngredientItem, TIngredientClickFunction } from "../../../services/types"
import styles from "./ingredients-item.module.css"

export default function BurgerIngredientsItem({
  ingredient,
  count,
  onClickIngredient,
}: {
  ingredient: IBurgerIngredientItem
  count: number
  onClickIngredient: TIngredientClickFunction
}) {
  return (
    <div className={styles.component} onClick={() => onClickIngredient(ingredient)}>
      <img className={styles.image} src={ingredient.image} />
      <div className={styles.price_line}>
        <span className={styles.price_number}>{ingredient.price}</span>
        <CurrencyIcon className={styles.price_currency} type="primary" />
      </div>
      <p className={styles.name}>{ingredient.name}</p>
      {count > 0 && <Counter count={count} size="default" extraClass={styles.counter} />}
    </div>
  )
}
