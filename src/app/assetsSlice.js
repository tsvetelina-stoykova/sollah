import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

function mkurl(path, params) {
	let query = [];
	for(let k in params) {
		if(params[k] !== '' && params[k] !== null) {
			query.push(`${k}=${params[k]}`);
		}
	}
	return path + '?' + query.join('&');
}

export const getAssets = createAsyncThunk(
	'assets/getAssets',
	async (filter, api) => {
		const state = api.getState();
		const limit = state.assets.pagesize;
		const offset = (filter.page-1)*limit;

		let diff_criteria = false;
		if(filter) {
			for(let k in filter) {
				if(k !== 'page' && filter[k] !== state.assets.filter[k]) {
					diff_criteria = true;
				}
			}
		}

		api.dispatch({type:'assets/filter', payload: filter});
		api.dispatch({type:'assets/pending', payload: filter});

		const result = await fetch(mkurl('https://sollahlibrary.com/mapi/4/assets', {...filter, offset, limit, page:null}))
			.then(res => res.json());

		if(diff_criteria) api.dispatch({type:'assets/reset'});
		api.dispatch({type:'assets/success', payload: {assets:result.assets, filter}});

	}
)

const assetsSlice = createSlice({
	name: 'assets',
	initialState: {
		filter: {
			page: 1, // does not reset the .list[] prop
			q: '',
			type_id: '',
			topic_id: '',
			learning_path_id: '',
			target_audience_id: '',
			industry_setting_id: '',
			language_id: '',
		},
		list: [],
		count: 0,
		status: {},
		pagesize: 20
	},
	extraReducers: {
		'assets/filter': (state, action) => {
			state.filter = action.payload;
		},
		'assets/reset': (state, action) => {
			state.list = [];
			state.count = 0;
			state.status = {};
			state.pagesize = 20;
		},
		'assets/pending': (state, action) => {
			const filter = action.payload;
			state.status[filter.page] = 'pending';
		},
		'assets/success': (state, action) => {
			const filter = action.payload.filter;
			const assets = action.payload.assets;
			state.status[filter.page] = 'success';
			state.count = action.payload.count;
			if(state.list.length === 0) {
				state.list = new Array(state.count);
				state.list.fill(null);
			}
			state.list.splice((filter.page-1)*state.pagesize, assets.length, ...assets);
		},
		[getAssets.rejected]: (state, action) => {
			const filter = action.meta.arg;
			state.status[filter.page] = 'failed';
		},
	}
})

export default assetsSlice.reducer