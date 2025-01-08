import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { IBurgerIngredientItem, IngredientClickFunction } from "../burger-ingredients"
import styles from "./ingredients-item.module.css"

export default function BurgerIngredientsItem({
  ingredient,
  count,
  onClickIngredient,
}: {
  ingredient: IBurgerIngredientItem
  count: number
  onClickIngredient: IngredientClickFunction
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
