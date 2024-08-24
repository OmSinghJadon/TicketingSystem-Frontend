import {configureStore , combineReducers} from "@reduxjs/toolkit"
import ticketReducer from './slice/ticketSlice'
import userReducer from "./slice/userSlice"

const rootReducer = combineReducers({
    ticket: ticketReducer,
    user: userReducer
  });

  export const store = configureStore({
    reducer: rootReducer
  });


