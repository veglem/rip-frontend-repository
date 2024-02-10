import {useDispatch, useSelector} from 'react-redux';
import {
	updateOrder,
	updateOrderId,
	updateName,
	updateDescription
} from "../../store/orders/orderSlice";
import {api} from "../../utils/api";
import {useNavigate} from "react-router-dom"

export function useOrder() {

	const order = useSelector(state => state.order.order)
	const order_id = useSelector(state => state.order.order_id)
	const name = useSelector(state => state.order.name)
	const description = useSelector(state => state.order.description)

	const navigate = useNavigate()

	const is_draft = order?.status == 1

	const dispatch = useDispatch()

	const setOrder = (value) => {
		dispatch(updateOrder(value))
	}

	const setOrderId = (value) => {
		dispatch(updateOrderId(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setDescription = (value) => {
		dispatch(updateDescription(value))
	}

	const sendOrder = async () => {

		const response = await api.put(`orders/${order.id}/update_status_user/`)

		if (response.status == 200)
		{
			setOrder(undefined)
			setName("")
			setDescription("")
		}
	}

	const deleteOrder = async () => {

		const response = await api.delete(`orders/${order.id}/delete/`)

		if (response.status == 200)
		{
			setOrder(undefined)
			setName("")
			setDescription("")
		}
	}

	const saveOrder = async () => {
		const formData = new FormData()
		formData.append("name", name)
		formData.append("description", description)

		await api.put(`orders/${order.id}/update/`, formData)

	}

	const fetchOrder = async (order_id) => {

		const {data} = await api.get(`orders/${order_id}/`)

		console.log(data)
		setOrder(data)
		setName(data["name"])
		setDescription(data["orderBody"])
	}

	const addUnitToOrder = async (unit) => {
		await api.post(`units/${unit.id}/add_to_order/`)
	}

	const deleteUnitFromOrder = async (unit) => {
		const response = await api.delete(`orders/${order.id}/delete_unit/${unit.id}/`)

		if (response.status == 200) {
			await fetchOrder(order_id)
		} else if (response.status == 201) {
			navigate("/")
		}
	}

	return {
		order,
		order_id,
		is_draft,
		name,
		description,
		setOrder,
		saveOrder,
		sendOrder,
		setName,
		setDescription,
		deleteOrder,
		fetchOrder,
		addUnitToOrder,
		deleteUnitFromOrder,
		setOrderId
	};
}