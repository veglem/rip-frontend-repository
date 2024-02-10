import { createSlice } from "@reduxjs/toolkit"
import {act} from "react-dom/test-utils";

const initialState = {
	username: "",
	fio: "",
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
		},
		updateName: (state, action) => {
			state.username = action.payload
		},
		updateFio: (state, action) => {
			state.fio = action.payload
		},
		cleanUser: (state) => {
			state.is_authenticated = false
			state.is_moderator = false
			state.username = ""
			state.fio = ""
		}
	}
})

export const { updateUser, cleanUser, updateName, updateFio } = authSlice.actions

export default authSlice.reducer