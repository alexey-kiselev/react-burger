import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../services/hooks"
import { selectIngredients } from "../../services/ingredients"
import { selectSelectedIngredient, setSelectedIngredient } from "../../services/selected-ingredient"
import styles from "./ingredient-details.module.css"

export function IngredientDetails(): JSX.Element {
  const ingredient = useAppSelector(selectSelectedIngredient)
  const ingredients = useAppSelector(selectIngredients)
  const dispatch = useAppDispatch()
  const { id } = useParams()

  useEffect(() => {
    if (!ingredient) {
      const ingredientById = ingredients.find((ing) => ing._id === id)!
      dispatch(setSelectedIngredient(ingredientById))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients])

  return (
    <div className={styles.ingredient_details}>
      <div className={styles.ingredient_image_container}>
        <img className={styles.ingredient_image} src={ingredient?.image} alt={ingredient?.name} />
      </div>
      <p className={styles.ingredient_name}>{ingredient?.name}</p>
      <div className={styles.nutritionals}>
        <div className={styles.nutritional_block}>
          <p className={styles.nutritional_text}>Калории, ккал</p>
          <p className={styles.nutritional_value}>{ingredient?.calories}</p>
        </div>
        <div className={styles.nutritional_block}>
          <p className={styles.nutritional_text}>Белки, г</p>
          <p className={styles.nutritional_value}>{ingredient?.proteins}</p>
        </div>
        <div className={styles.nutritional_block}>
          <p className={styles.nutritional_text}>Жиры, г</p>
          <p className={styles.nutritional_value}>{ingredient?.fat}</p>
        </div>
        <div className={styles.nutritional_block}>
          <p className={styles.nutritional_text}>Углеводы, г</p>
          <p className={styles.nutritional_value}>{ingredient?.carbohydrates}</p>
        </div>
      </div>
    </div>
  )
}
