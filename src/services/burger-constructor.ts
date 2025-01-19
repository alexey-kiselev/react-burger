import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit/react"
import { IBurgerConstructor, IBurgerIngredientItem } from "./types"

const initialState: IBurgerConstructor = {
  bun: null,
  ingredients: [],
}

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    setBurgerBun(state: IBurgerConstructor, action: PayloadAction<IBurgerIngredientItem>) {
      state.bun = { _id: action.payload._id }
    },
    addMiddleIngredientToTop: {
      reducer: (state: IBurgerConstructor, action: PayloadAction<IBurgerIngredientItem>) => {
        state.ingredients = [{ _id: action.payload._id, uuid: action.payload.uuid! }, ...state.ingredients]
      },
      prepare: (ingredient: IBurgerIngredientItem) => {
        const uuid = nanoid()
        return { payload: { ...ingredient, uuid: uuid } }
      },
    },
    addMiddleIngredientToBottom: {
      reducer: (state: IBurgerConstructor, action: PayloadAction<IBurgerIngredientItem>) => {
        state.ingredients.push({ _id: action.payload._id, uuid: action.payload.uuid! })
      },
      prepare: (ingredient: IBurgerIngredientItem) => {
        const uuid = nanoid()
        return { payload: { ...ingredient, uuid: uuid } }
      },
    },
    changeMiddleIngredientByIndex(
      state: IBurgerConstructor,
      action: PayloadAction<{ ingredient: IBurgerIngredientItem; index: number }>
    ) {
      state.ingredients[action.payload.index]._id = action.payload.ingredient._id
    },
    changeMiddleIngredientsByIndexes(
      state: IBurgerConstructor,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) {
      state.ingredients.splice(action.payload.toIndex, 0, state.ingredients.splice(action.payload.fromIndex, 1)[0])
    },
    deleteIngredientByIndex(state: IBurgerConstructor, action: PayloadAction<number>) {
      state.ingredients.splice(action.payload, 1)
    },
    cleanupConstructor(state: IBurgerConstructor) {
      state.bun = null
      state.ingredients = []
    },
  },
  selectors: {
    selectBurgerConstructor: (state) => state,
  },
})

export const {
  setBurgerBun,
  addMiddleIngredientToTop,
  addMiddleIngredientToBottom,
  deleteIngredientByIndex,
  changeMiddleIngredientByIndex,
  changeMiddleIngredientsByIndexes,
  cleanupConstructor,
} = burgerConstructorSlice.actions
export const { selectBurgerConstructor } = burgerConstructorSlice.selectors
