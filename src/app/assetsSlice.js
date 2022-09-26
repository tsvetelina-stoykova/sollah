import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getAssets = createAsyncThunk(
	'assets/getAssets',
	async (filter, api) => {
		console.log(filter);
		const state = api.getState();
		const limit = state.assets.pagesize;
		const offset = (filter.page-1)*limit;

		return fetch(`https://sollahlibrary.com/mapi/4/assets?offset=${offset}&limit=${limit}`)
			.then(res => res.json());
	}
)

const assetsSlice = createSlice({
	name: 'assets',
	initialState: {
		list: [],
		count: 0,
		status: {},
		pagesize: 20
	},
	extraReducers: {
		[getAssets.pending]: (state, action) => {
			const page = action.meta.arg;
			state.status[page] = 'loading';
		},
		[getAssets.fulfilled]: (state, action) => {
			const page = action.meta.arg;
			const assets = action.payload.assets;
			state.status[page] = 'success';
			state.count = action.payload.count;
			if(state.list.length === 0) {
				state.list = new Array(state.count);
				state.list.fill(null);
			}
			state.list.splice((page-1)*state.pagesize, assets.length, ...assets);
		},
		[getAssets.rejected]: (state, action) => {
			const page = action.meta.arg;
			state.status[page] = 'failed';
		},
	}
})

export default assetsSlice.reducer