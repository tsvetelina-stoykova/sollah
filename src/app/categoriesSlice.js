import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getCategories = createAsyncThunk(
	'categories/getCategories',
	async () => {
		return fetch('https://sollahlibrary.com/mapi/4/assets/categories')
			.then(res => res.json());
	}
)

const initCategory = {
	name: "Category",
	plural:	"Categories",
	key: "",
	all: [],
};

const categoriesSlice = createSlice({
	name: 'categories',
	initialState: {
		learning_path: initCategory,
		type: initCategory,
		topic: initCategory,
		industry_setting: initCategory,
		target_audience: initCategory,
		language: initCategory,
		status: 'pending',
	},
	extraReducers: {
		[getCategories.pending]: (state, action) => {
			state.status = 'loading';
		},
		[getCategories.fulfilled]: (state, action) => {
			state.status = 'success';
			for(let k in action.payload) {
				state[k] = action.payload[k];
			}
		},
		[getCategories.rejected]: (state, action) => {
			state.status = 'failed';
		},
	}
	
})

export default categoriesSlice.reducer