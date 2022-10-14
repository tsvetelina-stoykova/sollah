import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const listAll = createAsyncThunk(
	"blogs/listAll",
	async () => {
		return await fetch("https://sollahlibrary.com/mapi/4/blogs")
			.then((res) => res.json()) 
	}
)

const blogsSlice = createSlice({
	name: "blogs",
	initialState: {
		posts: [],
		count: 0,
		status: ""
	},
	extraReducers: {
		[listAll.pending]: (state) => {
			state.status="pending";
		},
		[listAll.fulfilled]: (state, action) => {
			state.status="success";
			state.posts = action.payload.posts;

		},
		[listAll.rejected]: (state) => {
			state.status="error";
		},
	}
})

export default blogsSlice.reducer