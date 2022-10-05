import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAuth = createAsyncThunk(
	'auth/getAuth',
	async ({email, password}) => {
		return fetch("https://sollahlibrary.com/mapi/4/auth/login", {
				method: 'POST',
				mode: 'cors',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({email, password})
		}).then(res => res.json());
	}
)

const user = JSON.parse(localStorage.getItem('user'));

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: user,
		error: null,
		status: '',
	},
	reducers: {
		logout(state) {
			state.user = null;
			localStorage.removeItem('user');
			// Todo: Navigate to login
		}
	},
	extraReducers: {
		[getAuth.pending]: (state) => {
			state.user = null;
			state.error = null;
			state.status = 'pending';
		},
		[getAuth.fulfilled]: (state, action) => {
			localStorage.setItem('user', JSON.stringify(user));
			state.user = user;
			state.error = null;
			state.status = 'success'
		},
		[getAuth.rejected]: (state, action) => {
			state.user = null;
			state.error = action.payload.message;
			state.status = 'failed'
		}
	}
})

export default authSlice.reducer