import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { burgerConstructorSlice } from "./burger-constructor"
import { IIngredientsState, ingredientsSlice } from "./ingredients"
import { ILastOrderState, lastOrderSlice } from "./last-order"
import { ISelectedIngredientState, selectedIngredientSlice } from "./selected-ingredient"
import { IBurgerConstructor } from "./types"
import { IUserState, userSlice } from "./user"

const rootReducer = combineSlices(
  userSlice,
  ingredientsSlice,
  burgerConstructorSlice,
  selectedIngredientSlice,
  lastOrderSlice
)

export interface IStoreState {
  user: IUserState
  ingredients: IIngredientsState
  burgerConstructor: IBurgerConstructor
  selectedIngredient: ISelectedIngredientState
  lastOrder: ILastOrderState
}

export const store = configureStore({
  reducer: rootReducer,
})

// https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
export type AppStore = typeof store
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
