import { createSlice, PayloadAction } from "@reduxjs/toolkit/react"
import { IBurgerConstructor, IBurgerIngredientItem } from "../types"

const initialState: IBurgerConstructor = {
  bun: null,
  ingredients: [],
}

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    setBurgerBun(state: IBurgerConstructor, action: PayloadAction<IBurgerIngredientItem>) {
      state.bun = action.payload
    },
  },
  selectors: {
    selectBurgerConstructor: (state) => state,
  },
})

export const { setBurgerBun } = burgerConstructorSlice.actions
export const { selectBurgerConstructor } = burgerConstructorSlice.selectors
