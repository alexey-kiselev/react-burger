import { MutableRefObject } from "react"
import { selectBurgerConstructor } from "../../../services/burger-constructor"
import { useAppSelector } from "../../../services/hooks"
import { IBurgerConstructor, IBurgerIngredientGroup, IBurgerIngredientItem } from "../../../services/types"
import BurgerIngredientsItem from "../ingredients-item/ingredients-item"
import styles from "./ingredients-group.module.css"

interface IGetIngredientCountFromConstructorProps {
  ingredient: IBurgerIngredientItem
  burgerConstructor: IBurgerConstructor
}

function getIngredientCountFromConstructor({
  ingredient,
  burgerConstructor,
}: IGetIngredientCountFromConstructorProps): number {
  if (ingredient._id === burgerConstructor.bun?._id || ingredient._id === burgerConstructor.bun?._id) {
    return 2
  }
  return burgerConstructor.ingredients.filter((search) => search._id === ingredient._id).length
}

interface IBurgerIngredientsGroupProps {
  headerRef: MutableRefObject<HTMLDivElement | null>
  group: IBurgerIngredientGroup
  ingredients: IBurgerIngredientItem[]
}

export default function BurgerIngredientsGroup({
  headerRef,
  group,
  ingredients,
}: IBurgerIngredientsGroupProps): JSX.Element {
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
