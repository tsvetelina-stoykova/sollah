import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const listMessages = createAsyncThunk(
	'messages/listMessages',
	async (payload, api) => {
		const user = api.getState().auth.user;
		return await fetch('https://sollahlibrary.com/mapi/4/messages', {
			headers: { "x-authorization-token": user.token },
			mode: "cors",
		}).then(res => res.json());
	}
)

const messagesSlice = createSlice({
	name:'messages',
	initialState: {
		allMessages: [],
		status: ''
	},
	extraReducers: {
		[listMessages.pending]: (state) => {
			state.status = 'pending'
		},
		[listMessages.fulfilled]: (state, action) => {
			state.status = 'success';
			state.allMessages = action.payload.messages;
			console.log(state.allMessages)
		},
		[listMessages.rejected]: (state) => {
			state.status = 'error'
		}
	}
})

export default messagesSlice.reducer