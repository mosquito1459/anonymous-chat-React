import { configureStore } from '@reduxjs/toolkit'
import UserStore from './UserStore'
import WindowApp from './WindowApp'
import ChatStore from './ChatStore'

export const store = configureStore({
    reducer: {
      User: UserStore,
      Window: WindowApp,
      Chat: ChatStore
    },
})