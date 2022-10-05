import { configureStore } from "@reduxjs/toolkit";
import assetsReducer from "./assetsSlice"
import categoriesReducer from "./categoriesSlice";
import authReducer from "./authSlice"

export const store = configureStore({
	reducer: {
		assets: assetsReducer,
		categories: categoriesReducer,
		auth: authReducer
	},
})