import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import api from "../utils/api"
import { IUser } from "./types"

export interface IUserState {
  user: IUser | null
  isAuthChecked: boolean
}

const initialState: IUserState = {
  user: null,
  isAuthChecked: false,
}

export const login = createAsyncThunk("user/login", api.auth.login)

export const logout = createAsyncThunk("user/logout", api.auth.logout)

export const checkUserAuth = createAsyncThunk("user/checkUserAuth", async (_, { dispatch }) => {
  if (localStorage.getItem("accessToken")) {
    api.auth
      .getUser()
      .then((user: IUser | null) => dispatch(setUser(user)))
      .finally(() => dispatch(setIsAuthChecked(true)))
  } else {
    dispatch(setIsAuthChecked(true))
  }
})

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthChecked: (state: IUserState, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload
    },
    setUser: (state: IUserState, action: PayloadAction<IUser | null>) => {
      state.user = action.payload
    },
  },
  selectors: {
    getIsAuthChecked: (state: IUserState) => state.isAuthChecked,
    getUser: (state: IUserState) => state.user,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state: IUserState, action: PayloadAction<IUser>) => {
        state.user = action.payload
        state.isAuthChecked = true
      })
      .addCase(logout.fulfilled, (state: IUserState) => {
        state.user = null
      })
  },
})

export const { setIsAuthChecked, setUser } = userSlice.actions
export const { getIsAuthChecked, getUser } = userSlice.selectors
