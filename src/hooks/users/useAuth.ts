import {useDispatch, useSelector} from 'react-redux';
import {updateUser, cleanUser, updateFio, updateName, updateAvatar} from "../../store/users/authSlice";
import {api} from "../../utils/api";

export function useAuth() {
	const {is_authenticated, is_moderator, username, fio, avatarUrl} = useSelector(state => state.user)

	const dispatch = useDispatch()

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const resetUser = () => {
		dispatch(cleanUser())
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setFio = (value) => {
		dispatch(updateFio(value))
	}

	const setAvatar = (value) => {
		dispatch(updateAvatar(value))
	}

	const logOut = async () => {

		const response = await api.post(`auth/logout/`)

		if (response.status == 200)
		{
			resetUser()
		}

	}

	const register = async (formData) => {

		try {

			const response = await api.post(`auth/signin/`, formData as FormData)

			if (response.status == 201) {
				return true
			}

		} catch (error) {

			return false
		}
	}

	const login = async (formData) => {

		try {
			const response = await api.post(`auth/login/`, formData)

			if (response.status == 200) {

				const response2 = await api.get(`auth/`)

				const permissions = {
					is_authenticated: true,
					is_moderator: response2.data["isModerator"],
					username: response2.data["username"],
					fio: response2.data["fio"],
					avatarUrl: "http://127.0.0.1:9000/" + response2.data["imageUrl"]
				}

				setUser(permissions)

			}

			return true

		} catch (error){

		}
	}

	const auth = async () => {

		if (is_authenticated)
		{
			return true
		}

		try {

			const response = await api.get(`auth`)

			if (response.status == 200)
			{
				const permissions = {
					is_authenticated: true,
					is_moderator: response.data["isModerator"],
					username: response.data["username"],
					fio: response.data["fio"],
					avatarUrl: "http://127.0.0.1:9000/" + response.data["imageUrl"]
				}

				setUser(permissions)

				return true
			}

		} catch (error) {

			return false

		}

	}

	const updateUserInfo = async (input_username, input_fio) => {
		const formData = new FormData()
		formData.append("fio", input_fio)

		if (input_username != username) {
			formData.append("username", input_username)
		}

		const response = await api.put(`auth/update`, formData)

		if (response.status == 200) {
			setName(input_username)
			setFio(input_fio)
		}
	}

	return {
		is_authenticated,
		is_moderator,
		username,
		fio,
		avatarUrl,
		setAvatar,
		setUser,
		logOut,
		login,
		auth,
		register,
		updateUserInfo
	};
}