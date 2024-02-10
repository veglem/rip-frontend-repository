import {configureStore} from "@reduxjs/toolkit";

import unitReducer from "./units/unitSlice"
import draftOrderReducer from "./orders/orderSlice"
import authReducer from "./users/authSlice"
import ordersReducer from "./orders/ordersSlice"
import unitsReducer  from "./units/unitsSlice"

export default configureStore({
	reducer: {
		unit: unitReducer,
		units: unitsReducer,
		order: draftOrderReducer,
		orders: ordersReducer,
		user: authReducer
	}
});