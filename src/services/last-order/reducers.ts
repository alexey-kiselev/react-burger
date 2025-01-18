import { createSlice } from "@reduxjs/toolkit/react"
import { createOrder } from "./actions"

export interface ILastOrderState {
  order: {
    name: string | null
    order: {
      number: number | null
    }
    success: boolean | null
  } | null
  loading: boolean
  error: string | null | undefined
}

const initialState: ILastOrderState = {
  order: null,
  loading: false,
  error: null,
}

export const lastOrderSlice = createSlice({
  name: "lastOrder",
  initialState,
  reducers: {},
  selectors: {
    selectLastOrderState: (state) => state,
    selectLastOrderNumber: (state) => state.order?.order.number,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.order = null
        state.loading = true
        state.error = null
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.error?.message
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload
        state.loading = false
        state.error = null
      })
  },
})

export const { selectLastOrderState, selectLastOrderNumber } = lastOrderSlice.selectors
