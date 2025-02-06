import { MutableRefObject } from "react"
import { selectBurgerConstructor } from "../../../services/burger-constructor"
import { useAppSelector } from "../../../services/hooks"
import { IBurgerConstructor, IBurgerIngredientGroup, IBurgerIngredientItem } from "../../../services/types"
import BurgerIngredientsItem from "../ingredients-item/ingredients-item"
import styles from "./ingredients-group.module.css"

function getIngredientCountFromConstructor({
  ingredient,
  burgerConstructor,
}: {
  ingredient: IBurgerIngredientItem
  burgerConstructor: IBurgerConstructor
}) {
  if (ingredient._id === burgerConstructor.bun?._id || ingredient._id === burgerConstructor.bun?._id) {
    return 2
  }
  return burgerConstructor.ingredients.filter((search) => search._id === ingredient._id).length
}

export default function BurgerIngredientsGroup({
  headerRef,
  group,
  ingredients,
}: {
  headerRef: MutableRefObject<HTMLDivElement | null>
  group: IBurgerIngredientGroup
  ingredients: IBurgerIngredientItem[]
}) {
  const burgerConstructor = useAppSelector(selectBurgerConstructor)

  return (
    <div className={styles.component} ref={headerRef}>
      <h2 className={styles.title}>{group.title}</h2>
      <div className={styles.ingredients}>
        {ingredients.map((ingredient) => (
          <BurgerIngredientsItem
            ingredient={ingredient}
            count={getIngredientCountFromConstructor({ ingredient, burgerConstructor })}
            key={ingredient._id}
          />
        ))}
      </div>
    </div>
  )
}
