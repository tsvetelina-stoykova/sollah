import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getNew = createAsyncThunk(
	"newassets/getNew",
	async (payload, api) => {
		const state = api.getState();
		const limit = state.newassets.pagesize;
		const offset = (state.newassets.page-1)*limit;

		const result =  await fetch("https://sollahlibrary.com/mapi/4/assets/whats_new",
		{offset, limit, page:null})
					.then((res) => res.json());
		api.dispatch({type:"newassets/success", payload: {newassets:result.assets, count:result.count}})
	} 
)

const newassetsSlice = createSlice({
	name: "newassets",
	initialState: {
		new: [],
		page: 1,
		count: 0,
		pagesize: 6,
		status: ""
	},
	extraReducers: {
		[getNew.pending]: (state) => {
			state.status = "pending";
		},
		"newassets/success": (state, action) => {
			state.new = action.payload.assets;
			state.status = "success";
			state.count = action.payload.count;
			state.new.splice((state.page-1)*state.pagesize, state.new.length);
		},
		[getNew.rejected]: (state) => {
			state.status = "error";
		},
	}
})

export default newassetsSlice.reducer