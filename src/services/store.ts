import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { IIngredientsState, ingredientsSlice } from "./ingredients/reducers"

const rootReducer = combineSlices(ingredientsSlice)

export interface IStoreState {
  ingredients: IIngredientsState
}

export const store = configureStore({
  reducer: rootReducer,
})

// https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
export type AppStore = typeof store
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
