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

export const logout = createAsyncThunk(
	'auth/logout',
	async () => {  return localStorage.removeItem('user') },
) 

const user = JSON.parse(localStorage.getItem('user')) || null;
const initialState = user ? {isLoggedIn: true, user, status: '', error: null} : {isLoggedIn: false, user: null, status: '', error: null};

const authSlice = createSlice({
	name: 'auth',
	initialState,
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
			state.isLoggedIn = true;
			state.error = null;
			state.status = 'success'
		},
		[login.rejected]: (state, action) => {
			state.user = null;
			localStorage.removeItem('user');
			state.isLoggedIn = false;
			state.error = action.payload.message;
			state.status = 'failed'
			// TODO handle console error
		},
		[logout.fulfilled]: (state, action) => {
			state.user = null;
			state.isLoggedIn = false;
		}
	}
})

export default authSlice.reducer