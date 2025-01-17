import { createSlice } from "@reduxjs/toolkit/react"
import { IBurgerConstructor } from "../types"

const initialState: IBurgerConstructor = {
  bun: null,
  ingredients: [],
}

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {},
  selectors: {
    selectBurgerConstructor: (state) => state,
  },
})

export const { selectBurgerConstructor } = burgerConstructorSlice.selectors
