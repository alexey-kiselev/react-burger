import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { burgerConstructorSlice } from "./burger-constructor/reducers"
import { IIngredientsState, ingredientsSlice } from "./ingredients/reducers"
import { IBurgerConstructor } from "./types"

const rootReducer = combineSlices(ingredientsSlice, burgerConstructorSlice)

export interface IStoreState {
  ingredients: IIngredientsState
  burgerConstructor: IBurgerConstructor
}

export const store = configureStore({
  reducer: rootReducer,
})

// https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
export type AppStore = typeof store
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
