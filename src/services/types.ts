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
  bun: { _id: string } | null
  ingredients: { _id: string }[]
}
