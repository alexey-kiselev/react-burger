import { createAsyncThunk } from "@reduxjs/toolkit"
import { getIngredientsApi } from "../../utils/api/ingredients"

export const getIngredients = createAsyncThunk("ingredients/getIngredients", async () => {
  const response = await getIngredientsApi()
  return response.data
})
