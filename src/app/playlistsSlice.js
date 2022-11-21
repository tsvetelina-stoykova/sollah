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
			action.payload.mine.forEach(p => { state.map[p.id] = p });
			action.payload.shared.forEach(p => { state.map[p.id] = p });
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
		[createPlaylist.fulfilled]: (state, action) => {
			state.status = "success";
			const playlist = action.payload.playlist;
			state.mine.push(playlist.id);
			state.map[playlist.id] = playlist;
		}
	}
})

export default playlistsSlice.reducer