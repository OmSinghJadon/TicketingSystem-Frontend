import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    ticketData : {
    }
}

export const ticketSlice = createSlice({
    name : "ticket",
    initialState,
    reducers:{
        ticketCount : (state , action) =>{
            state.ticketCount = action.payload
        }

    }
})

export const {ticketCount} = ticketSlice.actions

export default ticketSlice.reducer