import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

function mkurl(path, params) {
	let query = [];
	for(let k in params) {
		if(params[k] !== '' && params[k] !== null) {
			query.push(`${k}=${params[k]}`);
		}
	}
	return path + '?' + query.join('&');
}

export const getNew = createAsyncThunk(
	"newassets/getNew",
	async (filter,  api) => {
		const state = api.getState();
		const limit = state.newassets.pagesize;
		const offset = (filter.page-1)*limit;

		let diff_criteria = false;
		if(filter){
			for(let k in filter) {
				if( k !== "page" && filter[k] !== state.assets.filter[k]) {
					diff_criteria = true;
				}
			}
		}

		api.dispatch({type:"newassets/filter", payload: filter});
		api.dispatch({type:"newassets/pending", payload: filter});

		const result = await fetch(mkurl("https://sollahlibrary.com/mapi/4/assets/whats_new",
		{...filter, offset, limit, page:null,}))
			.then((res) => res.json());

		if(diff_criteria) api.dispatch({type:"newassets/reset"});
		api.dispatch({type:"newassets/success", payload: {assets:result.assets, count:result.count, filter}});	
	}	
)

const newassetsSlice = createSlice({
	name: "newassets",
	initialState: {
		filter: {
			page: 1,
			q: "",
			type_id: "",
			topic_id: "",
			learining_path_id: "",
			target_audience_id: "",
			industry_setting_id: "",
			language_id: "",
		},
		count: 0,
		pagesize: 4,
		index: [],
		map: {},
		status: {},
	},
	extraReducers: {
		"newassets/filter": (state, action) => {
			state.filter = action.payload;
		},
		"newassets/reset": (state, action) => {
			state.index = [];
			state.count = 0;
			state.status = {};
			state.pagesize = 4;
		},
		"newassets/pending": (state, action) => {
			const filter = action.payload;
			state.status[filter.page] = "pending";
		},
		"newassets/success": (state, action) => {
			const filter = action.payload.filter;
			const newassets = action.payload.assets;
			state.status[filter.page] = "success";
			for(let n of newassets) {
				if(!(state.map[n.id] && state.map[n.id].components)) {
					state.map[n.id] = n;
				}
			}
			state.count = action.payload.count;	
			if(state.index.length === 0) {
				state.index = new Array(state.count);
				state.index.fill(null);
			}
			state.index.splice((filter.page-1)*state.pagesize, newassets.length, ...newassets.map(n => n.id));
		},
		[getNew.rejected]: (state, action) => {
			const filter = action.meta.arg;
			state.status[filter.page] = "failed";
		},
	}
})

export default newassetsSlice.reducer