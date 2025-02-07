export interface IUser {
  email: string
  name: string
}

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
  uuid?: string | null
}

export type TIngredientClickFunction = (ingredient: IBurgerIngredientItem) => void

export interface IBurgerIngredientGroup {
  type: string
  title: string
}

export interface IBurgerConstructorIngredientItem {
  _id: string
  uuid: string
}

export interface IBurgerConstructor {
  bun: { _id: string } | null
  ingredients: IBurgerConstructorIngredientItem[]
}

export interface IBurgerItemDragItem {
  ingredient: IBurgerIngredientItem
  constructorIngredientIndex: number | null
}
