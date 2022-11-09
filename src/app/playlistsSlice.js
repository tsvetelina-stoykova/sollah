import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const listPlaylists = createAsyncThunk(
	'playlists/listPlaylists',
	async (payload, api) => {
		const user = api.getState().auth.user;
		return await fetch("https://sollahlibrary.com/mapi/4/playlists", {
			headers: { "x-authorization-token": user.token },
			mode: "cors",
		}).then((res) => res.json());
	}
);

export const addLiked = createAsyncThunk(
	"playlists/addLiked",
	async ({asset_id}, api) => {
		const user = api.getState().auth.user;
		return await fetch(`https://sollahlibrary.com/mapi/4/playlists/liked/assets/${asset_id}`, {
			method: "PUT",
			headers: { "x-authorization-token": user.token },
			mode: "cors",
		}).then((res) => res.json());
	}
)

const playlistsSlice = createSlice({
	name: "playlists",
	initialState: {
		mine: [],
		shared: [],
		liked: [],
		status: "",
	},
	extraReducers: {
		[listPlaylists.pending]: (state) => {
			state.status = "pending";
		},
		[listPlaylists.fulfilled]: (state, action) => {
			state.status = "success";
			state.mine = action.payload.mine;
			state.shared = action.payload.shared;
		},
		[listPlaylists.rejected]: (state) => {
			state.status = "error";
		},
		[addLiked.fulfilled]: (state, action) => {
			state.status = "success";
			state.liked = action.payload;
		},
	}
})

export default playlistsSlice.reducer