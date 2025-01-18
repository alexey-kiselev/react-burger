import { createAsyncThunk } from "@reduxjs/toolkit"
import fakeOrder from "../../utils/api/order.json"
import { createOrderApi } from "../../utils/api/orders"

export const createOrder = createAsyncThunk("order/createOrder", async (ingredientsIDs: string[]) => {
  console.log(ingredientsIDs)
  return fakeOrder
  const response = await createOrderApi()
  return response.data
})
