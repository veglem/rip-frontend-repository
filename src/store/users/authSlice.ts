import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	username: "",
	fio: "",
	avatarUrl: "",
	is_authenticated: false,
	is_moderator: false,
}

const authSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		updateUser: (state, action) => {
			state.is_authenticated = action.payload.is_authenticated
			state.is_moderator = action.payload.is_moderator
			state.username = action.payload.username
			state.fio = action.payload.fio
			console.log("updateUser")
			console.log(action.payload.avatarUrl)
			state.avatarUrl = action.payload.avatarUrl
		},
		updateName: (state, action) => {
			state.username = action.payload
		},
		updateFio: (state, action) => {
			state.fio = action.payload
		},
		updateAvatar: (state, action) => {
			state.avatarUrl = action.payload
		},
		cleanUser: (state) => {
			state.is_authenticated = false
			state.is_moderator = false
			state.username = ""
			state.fio = ""
			state.avatarUrl = ""
		}
	}
})

export const { updateUser, cleanUser, updateName, updateFio, updateAvatar } = authSlice.actions

export default authSlice.reducer