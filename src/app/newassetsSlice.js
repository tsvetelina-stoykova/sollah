import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getNew = createAsyncThunk(
	"newassets/getNew",
	async () => {
		return await fetch("https://sollahlibrary.com/mapi/4/assets/whats_new")
					.then((res) => res.json());
	} 
)

const newassetsSlice = createSlice({
	name: "newassets",
	initialState: {
		new: [],
		status: ""
	},
	extraReducers: {
		[getNew.pending]: (state) => {
			state.status = "pending";
		},
		[getNew.fulfilled]: (state, action) => {
			state.new = action.payload.assets;
			state.status = "success";
			console.log(state.new)
		},
		[getNew.rejected]: (state) => {
			state.status = "error";
		},
	}
})

export default newassetsSlice.reducer