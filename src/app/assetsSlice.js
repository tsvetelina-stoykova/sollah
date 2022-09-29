import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getAssets = createAsyncThunk(
	'assets/getAssets',
	async (filter, api) => {
		const state = api.getState();
		const limit = state.assets.pagesize;
		const offset = (filter.page-1)*limit;

		const params = {...filter, offset, limit};
		delete params.page;
		let query = [];
		for(let k in params) {
			if(params[k] !== '') query.push(`${k}=${params[k]}`);
		}

		return fetch(`https://sollahlibrary.com/mapi/4/assets?`+query.join('&'))
			.then(res => res.json());
	}
)

const assetsSlice = createSlice({
	name: 'assets',
	initialState: {
		list: [],
		// filteredList: [],
		count: 0,
		status: {},
		pagesize: 20
	},
	// reducers: {
	// 	changeFilter: (state, action) => {

	// 	},
	// },
	extraReducers: {
		'assets/reset': (state, action) => {
			state.list = [];
			state.count = 0;
			state.status = {};
			state.pagesize = 20;
		},
		[getAssets.pending]: (state, action) => {
			const filter = action.meta.arg;
			state.status[filter.page] = 'pending';
		},
		[getAssets.fulfilled]: (state, action) => {
			const filter = action.meta.arg;
			const assets = action.payload.assets;
			state.status[filter.page] = 'success';
			state.count = action.payload.count;
			if(state.list.length === 0) {
				state.list = new Array(state.count);
				state.list.fill(null);
			}
			state.list.splice((filter.page-1)*state.pagesize, assets.length, ...assets);
			// state.filteredList = [...state.list];
		},
		[getAssets.rejected]: (state, action) => {
			const filter = action.meta.arg;
			state.status[filter.page] = 'failed';
		},
	}
})

export default assetsSlice.reducer