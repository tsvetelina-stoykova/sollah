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

export const getAsset = createAsyncThunk(
	"assets/getAsset",
	async ({id}) => {
		return await fetch(`https://sollahlibrary.com/mapi/4/assets/${id}`)
					.then((res) => res.json());
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
		count: 0,
		status: {},
		pagesize: 20,
		index: [],
		map: {},
	},
	extraReducers: {
		'assets/filter': (state, action) => {
			state.filter = action.payload;
		},
		'assets/reset': (state, action) => {
			state.index = [];
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
			const {assets} = action.payload;
			state.status[filter.page] = 'success';
			for(let a of assets) {
				if(!(state.map[a.id] && state.map[a.id].components)) {
					state.map[a.id] = a;
				}
			}
			state.count = action.payload.count;

			if(state.index.length === 0) {
				state.index = new Array(state.count);
				state.index.fill(null);
			}
			state.index.splice((filter.page-1)*state.pagesize, assets.length, ...assets.map(a=>a.id));
		},
		[getAssets.rejected]: (state, action) => {
			const filter = action.meta.arg;
			state.status[filter.page] = 'failed';
		},
		[getAsset.fulfilled]: (state, action) => {
			const asset = action.payload;
			state.map[asset.id] = asset;
			// console.log(asset);
		}
	}
})

export default assetsSlice.reducer