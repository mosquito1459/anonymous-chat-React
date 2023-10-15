import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    DisplayChange   : false,
    JoinRoom        : false
}

export const WindowStore = createSlice({
    name: "WindowStore",
    initialState,
    reducers : {
        toggleWindow: (state,action) => {
            state[action.payload?.Window]        = action.payload?.data
            // console.log(action.payload.Window, action.payload.data);
        }
    }
})

export const { toggleWindow } = WindowStore.actions

export default WindowStore.reducer