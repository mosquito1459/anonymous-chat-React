import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ChatRoom : null,
    ChatData : {
        // EitiYo: [
        //     { 
        //         id      : 0,
        //         user    : "mosquito",
        //         uuid    : "b648201e-eac9-4fac-a1a6-0125f99eccd9",
        //         message : "jtreiodtjodijfrtiodrjyoj"
        //     },
        //     { 
        //         id      : 1,
        //         user    : "AWt",
        //         uuid    : "b648201e-eac9-4fac-a1a6-eawrawt",
        //         message : "weryer"
        //     },
        //     { 
        //         id      : 2,
        //         user    : "AWt",
        //         uuid    : "b648201e-eac9-4fac-a1a6-eawrawt",
        //         message : "weryer"
        //     },
        //     { 
        //         id      : 3,
        //         user    : "mosquito",
        //         uuid    : "b648201e-eac9-4fac-a1a6-0125f99eccd9",
        //         message : "jtreiodtjodijfrtiodrjyoj"
        //     },
        // ],
    }
}

export const ChatStore = createSlice({
    name: "ChatStore",
    initialState,
    reducers : {
        ChangeChatRoom      : (state,action) => {
            state.ChatRoom = action.payload?.ChatRoom
        },
        ChatRoomCreate      : (state,action) => {
            state.ChatData[action.payload?.room] = []
        },
        SetRoomData         : (state,action) => {
            state.ChatData[action.payload?.room] = action.payload?.message
        }
    }
})

export const { ChangeChatRoom,ChatRoomCreate,SetRoomData } = ChatStore.actions

export default ChatStore.reducer