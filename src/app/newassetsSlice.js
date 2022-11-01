import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getNew = createAsyncThunk(
	"newassets/getNew",
	async () => fetch("https://sollahlibrary.com/mapi/4/assets/whats_new")
					.then((res) => res.json())
	
)

const newassetsSlice = createSlice({
	name: "newassets",
	initialState: {
		// new: {},
		count: 0,
		pagesize: 6,
		status: "",
		index: [],
		map: {},
	},
	extraReducers: {
		[getNew.pending]: (state) => {
			state.status = "pending";
		},
		[getNew.fulfilled]: (state, action) => {
			const newassets = action.payload.assets;
			state.status = "success";
			state.count = action.payload.count;	
		},
		[getNew.rejected]: (state) => {
			state.status = "error";
		},
	}
})

export default newassetsSlice.reducer