import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProfile = createAsyncThunk(
	'profile/getProfile',
	async (payload, api) => {
		const user = api.getState().auth.user;
		return await fetch("https://sollahlibrary.com/mapi/4/profile", {
			headers: { "x-authorization-token": user.token },
			mode: "cors",
		}).then((res) => res.json());
	}
)

const profileSlice = createSlice({
	name: "profile",
	initialState: {
		profile: {},
		status: "",
	},
	extraReducers: {
		[getProfile.pending]: (state) => {
			state.status = "pending";
		},
		[getProfile.fulfilled]: (state, action) => {
			state.profile = action.payload;
			state.status = "success";
		},
		[getProfile.rejected]: (state) => {
			state.status = "error";
		}
	}
})

export default profileSlice.reducer;