import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	unit: undefined,
};

const unitSlice = createSlice({
	name: 'unit',
	initialState: initialState,
	reducers: {
		updateUnit(state, action) {
			state.unit = action.payload
		},
		updateName(state, action) {
			state.unit.name = action.payload
		},
		updateDescription(state, action) {
			state.unit.description = action.payload
		}
	}
})

export const {
	updateUnit,
	updateName,
	updateDescription
} = unitSlice.actions;

export default unitSlice.reducer;