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

// export const getMessage = createAsyncThunk(
// 	'messages/getMessage',
// 	async ({id}, api) => {
// 		const user = api.getState().auth.user;
// 		return await fetch(`https://sollahlibrary.com/mapi/4/messages/${id}`, {
// 			headers: { "x-authorization-token": user.token },
// 			mode: "cors",
// 		}).then(res => res.json());
// 	}
// )

const messagesSlice = createSlice({
	name:'messages',
	initialState: {
		allMessages: [],
		status: '',
	},
	extraReducers: {
		[listMessages.pending]: (state) => {
			state.status = 'pending'
		},
		[listMessages.fulfilled]: (state, action) => {
			state.status = 'success';
			state.allMessages = action.payload.messages;
		},
		[listMessages.rejected]: (state) => {
			state.status = 'error'
		},
		// [getMessage.fulfilled]: (state, action) => {
		// 	const message = action.payload;
		// 	state.allMessages = message.find();
		// }
	}
})

export default messagesSlice.reducer