import {useDispatch, useSelector} from 'react-redux';
import {
	updateUnit,
	updateName,
	updateDescription,
	updateImage
} from "../../store/units/unitSlice";
import {api} from "../../utils/api";

export function useUnit() {
	const unit = useSelector(state => state.unit.unit);

	const dispatch = useDispatch()

	const setUnit = (value) => {
		dispatch(updateUnit(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setDescription = (value) => {
		dispatch(updateDescription(value))
	}

	const fetchUnit = async (id) => {
		const {data} = await api.get(`units/${id}`);
		setUnit(data)
	}

	const updateUnitImage = async (id, img) => {
		if (img == undefined) {
			return
		}

		let form_data = new FormData()
		form_data.append('image', img, img.name)

		const response = await api.put(`units/${id}/image/`, form_data, {
			headers: {
				'content-type': 'multipart/form-data'
			}
		})

		console.log(response.data)

	}

	return {
		unit,
		setUnit,
		fetchUnit,
		setName,
		setDescription,
		updateUnitImage
	};
}