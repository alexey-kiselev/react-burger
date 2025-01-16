import { createSlice } from "@reduxjs/toolkit/react"
import { IBurgerConstructor } from "../types"

const initialState: IBurgerConstructor = {
  bun: { _id: "643d69a5c3f7b9001cfa093c" }, // Краторная булка N-200i"
  ingredients: [
    { _id: "643d69a5c3f7b9001cfa0944" }, // Соус традиционный галактический
    { _id: "643d69a5c3f7b9001cfa093f" }, // Мясо бессмертных моллюсков Protostomi
    { _id: "643d69a5c3f7b9001cfa0947" }, // Плоды Фалленианского дерева
    { _id: "643d69a5c3f7b9001cfa0946" }, // Хрустящие минеральные кольца
    { _id: "643d69a5c3f7b9001cfa0946" }, // Хрустящие минеральные кольца
  ],
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
