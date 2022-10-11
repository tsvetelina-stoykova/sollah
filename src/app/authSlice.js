import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
	'auth/login',
	async ({email, password}) => {
		return fetch("https://sollahlibrary.com/mapi/4/auth/login", {
				method: 'POST',
				mode: 'cors',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({email, password})
		}).then(handleResponse);
	}
)

function handleResponse(response){
	return response.text().then(text => {
		const data = text && JSON.parse(text);
		if(!response.ok){
			const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
		}
		return data;
	})
}

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: JSON.parse(localStorage.getItem('user')) || null,
		error: null,
		status: '',
	},
	reducers: {
		logout(state) {
		// 	// Todo: Navigate to login
		}
			
	},
	extraReducers: {
		[login.pending]: (state) => {
			localStorage.removeItem('user');
			state.user = null;
			state.error = null;
			state.status = 'pending';
		},
		[login.fulfilled]: (state, action) => {
			const user = action.payload;
			localStorage.setItem('user', JSON.stringify(user));
			state.user = user;
			state.error = null;
			state.status = 'success'
		},
		[login.rejected]: (state, action) => {
			state.user = null;
			localStorage.removeItem('user');
			state.error = action.payload.message;
			state.status = 'failed'
		}
	}
})

export default authSlice.reducer