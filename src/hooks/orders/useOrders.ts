import {useDispatch, useSelector} from 'react-redux';
import {
	updateStatus,
	updateDateStart,
	updateDateEnd,
	updateUser
} from "../../store/orders/ordersSlice";
import {api} from "../../utils/api";

export function useOrders() {
	const status = useSelector(state => state.orders.status)
	const date_start = useSelector(state => state.orders.date_start)
	const date_end = useSelector(state => state.orders.date_end)
	const user = useSelector(state => state.orders.user)

	const dispatch = useDispatch()

	const setStatus = (value) => {
		dispatch(updateStatus(value))
	}

	const setDateStart = (value) => {
		dispatch(updateDateStart(value))
	}

	const setDateEnd = (value) => {
		dispatch(updateDateEnd(value))
	}

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const searchOrders = async () => {

		const {data} = await api.get(`orders/`, {
			params: {
				status: status,
				startDate: new Date(date_start).getFullYear() + '-' + (new Date(date_start).getMonth() + 1) + '-' + new Date(date_start).getDate(),
				endDate: new Date(date_end).getFullYear() + '-' + (new Date(date_end).getMonth() + 1) + '-' + new Date(date_end).getDate()
			}
		})

		console.log(data)

		return data.filter(order => order.creator.includes(user))

	}

	return {
		status,
		date_start,
		date_end,
		setStatus,
		searchOrders,
		setDateStart,
		setDateEnd,
		setUser
	};
}