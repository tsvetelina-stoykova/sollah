import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const listMessages = createAsyncThunk(
	'messages/listMessages',
	async () => {
		await fetch('https://sollahlibrary.com/mapi/4/messages').then(res => res.json());
	}
)

const messagesSlice = createSlice({
	name:'messages',
	initialState: {
		messages: {}
	},
	extraReducers: {}
})