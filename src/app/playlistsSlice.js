import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const listPlaylists = createAsyncThunk(
	'playlists/listPlaylists',
	async (payload, api) => {
		const user = api.getState().auth.user;
		return await fetch("https://sollahlibrary.com/mapi/4/playlists", {
			headers: { "x-authorization-token": user.token },
		}).then((res) => res.json());
	}
);

export const createPlaylist = createAsyncThunk(
	"playlists/createPlaylist",
	async ({name}, api) => {
		const user = api.getState().auth.user;
		return await fetch("https://sollahlibrary.com/mapi/4/playlists", {
			method: "POST",
			headers: {"x-authorization-token": user.token, 'content-type':'application/json'},
			body: JSON.stringify({name}),
			mode: "cors",
		}).then(handleResponse);
	}
);

// export const clonePlaylist = createAsyncThunk(
// 	"playlists/clonePlaylist",
// 	async ({name, asset_ids}, api) => {
// 		const user = api.getState().auth.user;
// 		return await fetch("https://sollahlibrary.com/mapi/4/playlists", {
// 			method: "POST",
// 			headers: {"x-authorization-token": user.token, 'content-type':'application/json'},
// 			body: JSON.stringify({name, asset_ids}),
// 			mode: "cors",
// 		}).then(handleResponse)
// 	}
// )

function handleResponse(response){
	return response.text().then(text => {
		const data = text && JSON.parse(text);
		if(!response.ok){
			const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
		}
		return data;
	})
}

export const togglePlaylist = createAsyncThunk(
	"playlists/togglePlaylist",
	async ({ asset_id, playlist_id, add }, api) => {
		const user = api.getState().auth.user;
		// api.dispatch({type:"playlists/togglePlaylist/fulfilled", payload:{ asset_id, playlist_id, add }});
		return await fetch(`https://sollahlibrary.com/mapi/4/playlists/${playlist_id}/assets/${asset_id}`, {
			method: add ? "PUT" : "DELETE",
			headers: { "x-authorization-token": user.token },
			mode: "cors",
		}).then((res) => ({ asset_id, playlist_id, add }));
	}
);

export const updatePlaylist = createAsyncThunk(
	"playlists/updatePlaylist",
	async({playlist_id, name}, api) => {
		const user = api.getState().auth.user;
		return fetch(`https://sollahlibrary.com/mapi/4/playlists/${playlist_id}`, {
			method: "PUT",
			headers: {"x-authorization-token": user.token, 'content-type':'application/json'},
			mode: "cors",
			body: JSON.stringify({name}),
		}).then((res) => ({playlist_id, name}));
	}
);

export const deletePlaylist = createAsyncThunk(
	"playlists/deletePlaylist",
	async({playlist_id}, api) => {
		const user = api.getState().auth.user;
		return fetch(`https://sollahlibrary.com/mapi/4/playlists/${playlist_id}`, {
			method: "DELETE",
			headers: {"x-authorization-token": user.token},
			mode: "cors",
		}).then((res) => ({playlist_id}));
	}
);

const playlistsSlice = createSlice({
	name: "playlists",
	initialState: {
		mine: [],
		shared: [],
		map: {},
		status: "",
	},
	extraReducers: {
		[listPlaylists.pending]: (state) => {
			state.status = "pending";
		},
		[listPlaylists.fulfilled]: (state, action) => {
			state.status = "success";
			// indices
			state.mine = action.payload.mine.map(p => p.id);
			state.shared = action.payload.shared.map(p => p.id);
			// map
			state.map = {};
			action.payload.mine.forEach(p => {state.map[p.id] = p });
			action.payload.shared.forEach(p => {state.map[p.id] = p });
		},
		[listPlaylists.rejected]: (state) => {
			state.status = "error";
		},
		[togglePlaylist.fulfilled]: (state, action) => {
			const { asset_id, playlist_id, add } = action.payload;
			if (state.map[playlist_id]) {
				state.status = "success";
				if (add && !state.map[playlist_id].asset_ids.includes(asset_id)) {
					state.map[playlist_id].asset_ids.push(asset_id);
				}
				else if (!add) {
					state.map[playlist_id].asset_ids = state.map[playlist_id].asset_ids.filter(id => id != asset_id);
				}
			}
		},
		[updatePlaylist.fulfilled]: (state, action) => {
			const { playlist_id, name} = action.payload;
			state.map[playlist_id].name = name;
		},
		[deletePlaylist.fulfilled]: (state, action) => {
			const { playlist_id } = action.payload;
			const m = {...state.map};
			delete m[playlist_id];
			state.map = m;
			state.mine = state.mine.filter(id => id != playlist_id);
		},
		[createPlaylist.fulfilled]: (state, action) => {
			state.status = "success";
			const playlist = action.payload.playlist;
			state.mine.push(playlist.id);
			state.map[playlist.id] = playlist;
		
		},
		// [clonePlaylist.fulfilled]: (state, action) => {
		// 	state.status = "success";
		// 	const new_playlist = action.payload.playlist;
		// 	state.mine.push(new_playlist.id);
		// 	state.mine[new_playlist.id] = new_playlist;
		// },

	}
})

export default playlistsSlice.reducer