import { createSlice, PayloadAction } from "@reduxjs/toolkit/react"
import { IBurgerIngredientItem } from "./types"

export interface ISelectedIngredientState {
  ingredient: IBurgerIngredientItem | null
}

const initialState: ISelectedIngredientState = {
  ingredient: null,
}

export const selectedIngredientSlice = createSlice({
  name: "selectedIngredient",
  initialState: initialState,
  reducers: {
    setSelectedIngredient(state: ISelectedIngredientState, action: PayloadAction<IBurgerIngredientItem>) {
      state.ingredient = action.payload
    },
    cleanupSelectedIngredient(state: ISelectedIngredientState) {
      state.ingredient = null
    },
  },
  selectors: {
    selectSelectedIngredientState: (state) => state,
    selectSelectedIngredient: (state) => state.ingredient,
  },
})

export const { setSelectedIngredient, cleanupSelectedIngredient } = selectedIngredientSlice.actions
export const { selectSelectedIngredientState, selectSelectedIngredient } = selectedIngredientSlice.selectors
