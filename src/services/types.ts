export interface IBurgerIngredientItem {
  _id: string
  type: string
  name: string
  price: number
  image: string
  calories: number
  proteins: number
  fat: number
  carbohydrates: number
}

export type TIngredientClickFunction = (ingredient: IBurgerIngredientItem) => void

export interface IBurgerIngredientGroup {
  type: string
  title: string
}

export interface IBurgerConstructor {
  bun: { top: { _id: string }; bottom: { _id: string } }
  ingredients: { _id: string }[]
}
