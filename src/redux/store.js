import {configureStore} from '@reduxjs/toolkit'
import { profileReducer, subscriptionReducer, userReducer } from './reducers/userReducer'
import { courseReducer } from './reducers/courseReducer'
import { adminReducer } from './reducers/adminReduces'
import { otherReducer } from './reducers/otherReducer'


const store = configureStore({
    reducer:{
        user:userReducer,
        profile:profileReducer,
        course:courseReducer,
        subscription:subscriptionReducer,
        admin:adminReducer,
        other:otherReducer

    }
})

export default store


export const server = "https://vivacious-gown-bass.cyclic.app/api/v1"
