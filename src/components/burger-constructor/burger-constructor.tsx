import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState } from "react"
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

  const bunTop = ingredients.find((ingredient) => ingredient._id === burgerConstructor.bun?._id)
  const bunBottom = ingredients.find((ingredient) => ingredient._id === burgerConstructor.bun?._id)
  const burgerIngredients = burgerConstructor.ingredients
    .map((searchIngredient) => ingredients.find((ingredient) => ingredient._id === searchIngredient._id))
    .filter((ingredient) => ingredient !== undefined)

  const handleSubmitOrder = () => {
    setIsVisibleOrderDetails(true)
  }

  const handleCloseOrderDetails = () => {
    setIsVisibleOrderDetails(false)
  }

  return (
    <div className={styles.burger_constructor}>
      <div className={styles.burger_constructor_bun}>
        {bunTop ? (
          <DropContainer ingredientType="bun_top">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bunTop.name + " (верх)"}
              price={bunTop.price}
              thumbnail={bunTop.image}
              key={"bun_top_" + bunTop._id}
            />
          </DropContainer>
        ) : (
          <DropContainer ingredientType="bun_top">
            <IngredientPlaceholder ingredientType="bun_top" text="Кинь в меня булкой" />
          </DropContainer>
        )}
      </div>
      <div className={styles.burger_constructor_ingredients}>
        {burgerIngredients.length > 0 ? (
          burgerIngredients.map((ingredient, index) => <BurgerConstructorItem ingredient={ingredient!} key={index} />)
        ) : (
          <>
            {[1, 2, 3].map((item) => (
              <DropContainer ingredientType="middle_ingredient" key={item}>
                <IngredientPlaceholder ingredientType="middle_ingredient" text="Добавь соус или начинку по вкусу" />
              </DropContainer>
            ))}
          </>
        )}
      </div>
      <div className={styles.burger_constructor_bun}>
        {bunBottom ? (
          <DropContainer ingredientType="bun_bottom">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bunBottom.name + " (низ)"}
              price={bunBottom.price}
              thumbnail={bunBottom.image}
              key={"bun_buttom_" + bunBottom._id}
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
          7562 <CurrencyIcon type="primary" />
        </p>
        <Button htmlType="submit" type="primary" size="large" extraClass="ml-10" onClick={handleSubmitOrder}>
          Оформить заказ
        </Button>
        {isVisibleOrderDetails && <OrderDetails onClose={handleCloseOrderDetails} />}
      </div>
    </div>
  )
}
