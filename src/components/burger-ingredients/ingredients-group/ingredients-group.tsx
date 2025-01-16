import {
  IBurgerConstructor,
  IBurgerIngredientGroup,
  IBurgerIngredientItem,
  TIngredientClickFunction,
} from "../../../services/types"
import BurgerIngredientsItem from "../ingredients-item/ingredients-item"
import styles from "./ingredients-group.module.css"

function getIngredientCountFromConstructor({
  ingredient,
  burgerConstructor,
}: {
  ingredient: IBurgerIngredientItem
  burgerConstructor: IBurgerConstructor
}) {
  if (ingredient._id === burgerConstructor.bun.top._id || ingredient._id === burgerConstructor.bun.bottom._id) {
    return 1
  }
  return burgerConstructor.ingredients.filter((search) => search._id === ingredient._id).length
}

export default function BurgerIngredientsGroup({
  group,
  ingredients,
  burgerConstructor,
  onClickIngredient,
}: {
  group: IBurgerIngredientGroup
  ingredients: IBurgerIngredientItem[]
  burgerConstructor: IBurgerConstructor
  onClickIngredient: TIngredientClickFunction
}) {
  return (
    <div className={styles.component}>
      <h2 className={styles.title}>{group.title}</h2>
      <div className={styles.ingredients}>
        {ingredients.map((ingredient) => (
          <BurgerIngredientsItem
            ingredient={ingredient}
            count={getIngredientCountFromConstructor({ ingredient, burgerConstructor })}
            key={ingredient._id}
            onClickIngredient={onClickIngredient}
          />
        ))}
      </div>
    </div>
  )
}
