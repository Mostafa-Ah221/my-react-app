import {configureStore} from '@reduxjs/toolkit'
import { counterReducer } from './counterSlice'
import { categoriesReducer } from './categorySlice'



export const store=configureStore({
    reducer:{
        counter:counterReducer,
        categories:categoriesReducer,
    }
})