import { configureStore } from "@reduxjs/toolkit";
import assetsReducer from "./assetsSlice"
import categoriesReducer from "./categoriesSlice";
import authReducer from "./authSlice";
import messagesReducer from "./messagesSlice";
import playlistsReducer from "./playlistsSlice";

export const store = configureStore({
	reducer: {
		assets: assetsReducer,
		categories: categoriesReducer,
		auth: authReducer,
		messages: messagesReducer,
		playlists: playlistsReducer,
	},
})