import {configureStore} from '@reduxjs/toolkit'
import projectReducer from './slices/project-slice'

const store = configureStore({
    reducer:{
        projectSlice: projectReducer
    }
})

export default store;