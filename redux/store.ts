
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { userApi } from "./apis/usersApis"
import { userManagementApis } from "./apis/userManagementApis"


const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [userManagementApis.reducerPath]: userManagementApis.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([
            userApi.middleware,
            userManagementApis.middleware
        ]),
})