import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={categories:[], loading:false, error:null}


 export const gitCategories=createAsyncThunk("categoriesSlice/gitCategories",
 async ()=> {
   const{data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    return data.data
}
)
const categoriesSlice=createSlice({
    name:"categoriesSlice",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(gitCategories.fulfilled,(state,action)=>{
            state.categories=action.payload
            state.loading=false
        }),
        builder.addCase(gitCategories.pending,(state,action)=>{
            state.loading=true
        })
    }
    
})

export const categoriesReducer=categoriesSlice.reducer