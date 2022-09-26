import { configureStore } from "@reduxjs/toolkit";
import assetsReducer from './assetsSlice'
import categoriesReducer from "./categoriesSlice";

export const store = configureStore({
	reducer: {
		assets: assetsReducer,
		categories: categoriesReducer
	},
})