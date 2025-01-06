import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { IBurgerIngredientItem } from "../burger-ingredients/burger-ingredients"
import styles from "./burger-constructor.module.css"
import BurgerConstructorItem from "./constructor-item/constructor-item"

export interface IBurgerConstructor {
  bun: { top: { _id: string }; bottom: { _id: string } }
  ingredients: { _id: string }[]
}

export default function BurgerConstructor({
  burgerConstructor,
  ingredients,
}: {
  burgerConstructor: IBurgerConstructor
  ingredients: IBurgerIngredientItem[]
}) {
  const bunTop = ingredients.find((ingredient) => (ingredient._id = burgerConstructor.bun.top._id))
  const bunBottom = ingredients.find((ingredient) => (ingredient._id = burgerConstructor.bun.bottom._id))
  const burgerIngredients = burgerConstructor.ingredients
    .map((searchIngredient) => ingredients.find((ingredient) => ingredient._id === searchIngredient._id))
    .filter((ingredient) => ingredient !== undefined)

  return (
    <div className={styles.burger_constructor}>
      <div className={styles.burger_constructor_bun}>
        {bunTop && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bunTop.name + " (верх)"}
            price={bunTop.price}
            thumbnail={bunTop.image}
            key={"bun_top_" + bunTop._id}
          />
        )}
      </div>
      <div className={styles.burger_constructor_ingredients}>
        {burgerIngredients.map((ingredient, index) => (
          <BurgerConstructorItem ingredient={ingredient} key={index} />
        ))}
      </div>
      <div className={styles.burger_constructor_bun}>
        {bunBottom && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bunBottom.name + " (низ)"}
            price={bunBottom.price}
            thumbnail={bunBottom.image}
            key={"bun_buttom_" + bunBottom._id}
          />
        )}
      </div>
      <div className={styles.bottom_line}>
        <p className={styles.total_price}>
          7562 <CurrencyIcon type="primary" />
        </p>
        <Button htmlType="submit" type="primary" size="large" extraClass="ml-10">
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}
