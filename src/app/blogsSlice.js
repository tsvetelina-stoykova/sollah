import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const listAll = createAsyncThunk(
	"blogs/listAll",
	async () => {
		return await fetch("https://sollahlibrary.com/mapi/4/blogs")
			.then((res) => res.json()) 
	}
)

export const getOne = createAsyncThunk(
	"blogs/getOne",
	async ({seo_id}) => {
		return await fetch(`https://sollahlibrary.com/mapi/4/blogs/${seo_id}`)
			.then((res) => res.json()) 
	}
)

const blogsSlice = createSlice({
	name: "blogs",
	initialState: {
		index: [],
		map: {},
		status: ""
	},
	extraReducers: {
		[listAll.pending]: (state) => {
			state.status="pending";
		},
		[listAll.fulfilled]: (state, action) => {
			const {posts} = action.payload;
			state.status="success";
			state.index = posts.map(p=>p.seo_id);
			for(let p of posts) {
				state.map[p.seo_id] = p;
			}
		},
		[listAll.rejected]: (state) => {
			state.status="error";
		},
		[getOne.fulfilled]: (state, action) => {
			const {post} = action.payload;
			state.map[post.seo_id] = post;
		},
	}
})

export default blogsSlice.reducer