import {useDispatch, useSelector} from 'react-redux';
import {
	updateUnits,
	updateQuery
} from "../../store/units/unitsSlice";
import {api} from "../../utils/api";
import {useOrder} from "../orders/useOrder";

export function useUnits() {
	const units = useSelector(state => state.units.units);
	const query = useSelector(state => state.units.query);

	const {setOrderId} = useOrder()

	const dispatch = useDispatch()

	const setUnits = (value) => {
		dispatch(updateUnits(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}

	const searchUnits = async () => {

		const {data} = await api.get(`units/`, {
			params: {
				filter: query
			}
		})

		const draft_order_id = data["draft"]
		setOrderId(draft_order_id)

		return data["units"]
	}

	const deleteUnit = async (unit) => {
		await api.delete(`units/${unit.id}/delete/`)
	}

	return {
		units,
		setUnits,
		query,
		setQuery,
		searchUnits,
		deleteUnit
	};
}