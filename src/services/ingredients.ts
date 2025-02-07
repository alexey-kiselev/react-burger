import { createAsyncThunk } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit/react"
import api from "../utils/api"
import { IBurgerIngredientItem } from "./types"

export const getIngredients = createAsyncThunk("ingredients/getIngredients", async () => {
  const response = await api.ingredients.getIngredients()
  return response.data
})

export interface IIngredientsState {
  ingredients: IBurgerIngredientItem[]
  loading: boolean
  error: string | null | undefined
}

const initialState: IIngredientsState = {
  ingredients: [],
  loading: false,
  error: null,
}

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  selectors: {
    selectIngredientsState: (state) => state,
    selectIngredients: (state) => state.ingredients,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false
        state.error = action.error?.message
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload
        state.loading = false
        state.error = null
      })
  },
})

export const { selectIngredientsState, selectIngredients } = ingredientsSlice.selectors
