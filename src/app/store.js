import { configureStore } from "@reduxjs/toolkit";
import assetsReducer from '../features/assetsSlice'

export const store = configureStore({
	reducer: {
		assets: assetsReducer
	},
})