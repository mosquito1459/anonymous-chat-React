import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isConnect : false,
  userDisplay: localStorage.getItem("userDisplay") || null,
  userUUID: null
}

export const UserStore = createSlice({
  name: "UserStore",
  initialState,
  reducers: {
    UpdateUser: (state,action) => {
      state.userDisplay   = action.payload?.userDisplay  || state.userDisplay
      state.userUUID      = action.payload?.userUUID     || state.userUUID
      // console.log("[STORE] UPDATE USER STORE");
    },
    Connect: (state,action) => {
      state.isConnect = action.payload?.isConnect
    }
  }
})

export const { UpdateUser, Connect } = UserStore.actions

export default UserStore.reducer
