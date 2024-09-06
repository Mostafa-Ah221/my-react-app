import { createSlice } from "@reduxjs/toolkit";


const initialState={counter:0 , userName:""}
const slice=createSlice({
    name:"counterSlice",
    initialState,
    reducers:{
        increase:(state)=>{
            state.counter +=1
            
        },
        decrease:(state)=>{
            state.counter -=1
            
        },
    }
})

export const counterReducer=slice.reducer
export const {increase,decrease}=slice.actions