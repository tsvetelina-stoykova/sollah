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

		api.dispatch({type:'assets/loading', payload: filter});

		const result = await fetch(mkurl('https://sollahlibrary.com/mapi/4/assets', 
		{...filter, offset, limit, page:null}))
			.then(res => res.json());

		if(diff_criteria) api.dispatch({type:'assets/reset'});
		api.dispatch({type:'assets/success',  payload: {assets:result.assets, count:result.count, filter}});
	}
);

export const getAsset = createAsyncThunk(
	"assets/getAsset",
	async ({id}) => {
		return await fetch(`https://sollahlibrary.com/mapi/4/assets/${id}`)
			.then((res) => res.json());
	}
);

export const getPlayUrl = createAsyncThunk(
	"assets/getPlayUrl",
	async ({asset_id, component_id}, api) => {
		const user = api.getState().auth.user;
		return await fetch(`https://sollahlibrary.com/mapi/4/assets/${asset_id}/play/${component_id}`, {
			headers: { "x-authorization-token": user.token },
			mode: "cors",	
		}).then(async (res) => ({asset_id, component_id, play: await res.json()}));
	}
);

export const getAssetsByIds = createAsyncThunk(
	"assets/getAssetsByIds",
	async ({ids}, api) => {
		const response = await fetch("https://sollahlibrary.com/mapi/4/assets", {
			method: 'PATCH',
			mode: 'cors',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(ids)
		}).then((res) => res.json());
		api.dispatch({type:'assets/bulk', payload: response.assets});
	}
);


const assetsSlice = createSlice({
	name: "assets",
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
		pagestatus: {}, // every page has status
		pagesize: 20,
		index: [],
		map: {},
		play: {},
	},
	extraReducers: {
		'assets/reset': (state, action) => {
			state.index = [];
			state.count = 0;
			state.pagestatus = {};
			state.pagesize = 20;
		},
		'assets/filter': (state, action) => {
			state.filter = action.payload;
		},
		'assets/loading': (state, action) => {
			const filter = action.payload;
			state.filter = filter;
			state.pagestatus[filter.page] = 'loading';
		},
		'assets/success': (state, action) => {
			const filter = action.payload.filter;
			const {assets} = action.payload;
			state.pagestatus[filter.page] = 'success';
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
			state.pagestatus[filter.page] = 'failed';
		},
		[getAsset.fulfilled]: (state, action) => {
			const asset = action.payload;
			const related_assets = asset.related_assets;
			related_assets.forEach(a => {
				if(!(a.id in state.map)) state.map[a.id] = a;
			});
			asset.related_assets = related_assets.map(a => a.id);
			state.map[asset.id] = asset;
		},
		[getPlayUrl.fulfilled]: (state, action) => {
			const p = action.payload;
			state.play[p.asset_id + '/' + p.component_id] = p.play;
		},
		'assets/bulk': (state, action) => {
			const assets = action.payload;
			assets.forEach(a => {state.map[a.id] = a});
		},
	}
})

export default assetsSlice.reducer