import { IBurgerIngredientItem } from "../burger-ingredients/burger-ingredients"
import ModalOverlay from "../modal-overlay/modal-overlay"
import Modal, { CallbackFunction } from "../modal/modal"
import styles from "./ingredient-details.module.css"

export default function IngredientDetails({
  ingredient,
  onClose,
}: {
  ingredient: IBurgerIngredientItem
  onClose: CallbackFunction
}) {
  return (
    <div className={styles.ingredient_details}>
      <Modal title="Детали ингредиента" onClose={onClose}>
        <img className={styles.ingredient_image} src={ingredient.image} />
        <p className={styles.ingredient_name}>{ingredient.name}</p>
        <div className={styles.nutritionals}>
          <div className={styles.nutritional_block}>
            <p className={styles.nutritional_text}>Калории, ккал</p>
            <p className={styles.nutritional_value}>{ingredient.calories}</p>
          </div>
          <div className={styles.nutritional_block}>
            <p className={styles.nutritional_text}>Белки, г</p>
            <p className={styles.nutritional_value}>{ingredient.proteins}</p>
          </div>
          <div className={styles.nutritional_block}>
            <p className={styles.nutritional_text}>Жиры, г</p>
            <p className={styles.nutritional_value}>{ingredient.fat}</p>
          </div>
          <div className={styles.nutritional_block}>
            <p className={styles.nutritional_text}>Углеводы, г</p>
            <p className={styles.nutritional_value}>{ingredient.carbohydrates}</p>
          </div>
        </div>
      </Modal>
      <ModalOverlay />
    </div>
  )
}
