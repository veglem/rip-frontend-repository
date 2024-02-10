import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	order: undefined,
	order_id: undefined,
	name: undefined,
	description: undefined
};

const orderSlice = createSlice({
	name: 'order',
	initialState: initialState,
	reducers: {
		updateOrder(state, action) {
			state.order = action.payload
		},
		updateName(state, action) {
			state.name = action.payload
		},
		updateDescription(state, action) {
			state.description = action.payload
		},
		updateOrderId(state, action) {
			state.order_id = action.payload
		}
	}
})

export const {
	updateOrder,
	updateName,
	updateDescription,
	updateOrderId
} = orderSlice.actions;

export default orderSlice.reducer;