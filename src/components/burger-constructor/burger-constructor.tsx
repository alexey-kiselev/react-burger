import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useMemo, useState } from "react"
import { selectBurgerConstructor } from "../../services/burger-constructor/reducers"
import { useAppSelector } from "../../services/hooks"
import { selectIngredients } from "../../services/ingredients/reducers"
import OrderDetails from "../order-details/order-details"
import styles from "./burger-constructor.module.css"
import BurgerConstructorItem from "./constructor-item/constructor-item"
import DropContainer from "./drop-container/drop-container"
import IngredientPlaceholder from "./ingredient-placeholder/ingredient-placeholder"

export default function BurgerConstructor() {
  const burgerConstructor = useAppSelector(selectBurgerConstructor)
  const ingredients = useAppSelector(selectIngredients)
  const [isVisibleOrderDetails, setIsVisibleOrderDetails] = useState(false)

  const bun = ingredients.find((ingredient) => ingredient._id === burgerConstructor.bun?._id)
  const burgerIngredients = burgerConstructor.ingredients
    .map((searchIngredient) => ingredients.find((ingredient) => ingredient._id === searchIngredient._id))
    .filter((ingredient) => ingredient !== undefined)

  const totalPrice = useMemo(() => {
    return (bun ? bun.price * 2 : 0) + burgerIngredients.reduce((total, ingredient) => (total += ingredient.price), 0)
  }, [bun, burgerIngredients])

  const canSubmitOrder = bun !== null && burgerIngredients.length > 0

  const handleSubmitOrder = () => {
    setIsVisibleOrderDetails(true)
  }

  const handleCloseOrderDetails = () => {
    setIsVisibleOrderDetails(false)
  }

  return (
    <div className={styles.burger_constructor}>
      <div className={styles.burger_constructor_bun}>
        {bun ? (
          <DropContainer ingredientType="bun_top">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + " (верх)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          </DropContainer>
        ) : (
          <DropContainer ingredientType="bun_top">
            <IngredientPlaceholder ingredientType="bun_top" text="Кинь в меня булкой" />
          </DropContainer>
        )}
      </div>
      <div className={styles.burger_constructor_ingredients}>
        <DropContainer ingredientType="middle_ingredient_to_top">
          <IngredientPlaceholder ingredientType="middle_ingredient" text="Добавь соус или начинку по вкусу" />
        </DropContainer>
        {burgerIngredients.length > 0 &&
          burgerIngredients.map((ingredient, index) => (
            <BurgerConstructorItem ingredient={ingredient!} key={index} constructorIngredientIndex={index} />
          ))}
        <DropContainer ingredientType="middle_ingredient_to_bottom">
          <IngredientPlaceholder ingredientType="middle_ingredient" text="Добавь соус или начинку по вкусу" />
        </DropContainer>
      </div>
      <div className={styles.burger_constructor_bun}>
        {bun ? (
          <DropContainer ingredientType="bun_bottom">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + " (низ)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          </DropContainer>
        ) : (
          <DropContainer ingredientType="bun_bottom">
            <IngredientPlaceholder ingredientType="bun_bottom" text="Кинь в меня булкой" />
          </DropContainer>
        )}
      </div>
      <div className={styles.bottom_line}>
        <p className={styles.total_price}>
          {totalPrice} <CurrencyIcon type="primary" />
        </p>
        <Button
          disabled={!canSubmitOrder}
          htmlType="submit"
          type="primary"
          size="large"
          extraClass="ml-10"
          onClick={handleSubmitOrder}
        >
          Оформить заказ
        </Button>
        {isVisibleOrderDetails && <OrderDetails onClose={handleCloseOrderDetails} />}
      </div>
    </div>
  )
}
