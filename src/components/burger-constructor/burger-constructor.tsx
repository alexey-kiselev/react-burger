import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useMemo, useState } from "react"
import { selectBurgerConstructor } from "../../services/burger-constructor"
import { useAppDispatch, useAppSelector } from "../../services/hooks"
import { selectIngredients } from "../../services/ingredients"
import { createOrder } from "../../services/last-order"
import DropContainer from "../dnd/drop-container/drop-container"
import OrderDetails from "../order-details/order-details"
import styles from "./burger-constructor.module.css"
import BurgerConstructorItem from "./constructor-item/constructor-item"
import IngredientPlaceholder from "./ingredient-placeholder/ingredient-placeholder"

export default function BurgerConstructor() {
  const dispatch = useAppDispatch()

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

  const canSubmitOrder = bun !== undefined && burgerIngredients.length > 0

  const handleSubmitOrder = () => {
    const ids = [bun!._id, ...burgerIngredients.map((ingredient) => ingredient._id), bun!._id]
    dispatch(createOrder(ids))
    setIsVisibleOrderDetails(true)
  }

  const handleCloseOrderDetails = () => {
    setIsVisibleOrderDetails(false)
  }

  return (
    <div className={styles.burger_constructor}>
      <div className={styles.burger_constructor_bun}>
        {bun ? (
          <DropContainer ingredientType="bun_top" dropType="bun">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + " (верх)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          </DropContainer>
        ) : (
          <DropContainer ingredientType="bun_top" dropType="bun">
            <IngredientPlaceholder ingredientType="bun_top" text="Кинь в меня булкой" />
          </DropContainer>
        )}
      </div>
      <div className={styles.burger_constructor_ingredients}>
        <DropContainer ingredientType="middle_ingredient_to_top" dropType="middle_ingredient">
          <IngredientPlaceholder ingredientType="middle_ingredient" text="Добавь соус или начинку по вкусу" />
        </DropContainer>
        {burgerIngredients.length > 0 &&
          burgerIngredients.map((ingredient, index) => (
            <DropContainer
              ingredientType="middle_ingredient_filled"
              constructorIngredientIndex={index}
              dropType="middle_ingredient_filled"
              key={index}
            >
              <DropContainer
                ingredientType="middle_ingredient_filled"
                constructorIngredientIndex={index}
                dropType="middle_ingredient"
              >
                <BurgerConstructorItem ingredient={ingredient!} constructorIngredientIndex={index} />
              </DropContainer>
            </DropContainer>
          ))}
        <DropContainer ingredientType="middle_ingredient_to_bottom" dropType="middle_ingredient">
          <IngredientPlaceholder ingredientType="middle_ingredient" text="Добавь соус или начинку по вкусу" />
        </DropContainer>
      </div>
      <div className={styles.burger_constructor_bun}>
        {bun ? (
          <DropContainer ingredientType="bun_bottom" dropType="bun">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + " (низ)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          </DropContainer>
        ) : (
          <DropContainer ingredientType="bun_bottom" dropType="bun">
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
