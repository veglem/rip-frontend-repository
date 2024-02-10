import "./ProfilePage.sass"
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import CustomButton from "../../components/CustomButton/CustomButton";
import {useEffect, useState} from "react";
import {variables} from "../../utils/consts";
import CustomInput from "../../components/CustomInput/CustomInput";
import UploadButton from "../../components/UploadButton/UploadButton";
import {api} from "../../utils/api";

const ProfilePage = () => {

	const navigate = useNavigate()

	const {is_authenticated, is_moderator, username, fio, avatarUrl, logOut, updateUserInfo, setAvatar} = useAuth()

	const [isEditing, setIsEditing] = useState(false)

	const [name_input, setNameInput] = useState<string>(username)
	const [fio_input, setFioInput] = useState<string>(fio)
	const [img, setImg] = useState<File | undefined>(undefined)
	const [image, setImage] = useState<string>(avatarUrl)

	const handleFileChange = (e) => {
		if (e.target.files) {
			const img = e.target?.files[0]
			setImg(img)
			setImage(URL.createObjectURL(img))
		}
	}

	useEffect(() => {
		if (!is_authenticated) {
			navigate("/")
		}
	}, [])

	const doLogOut = async () => {
		await logOut()
		navigate("/")
	}

	const handleEdit = async () => {
		setIsEditing(true)
	}

	const handleSave = async () => {
		await updateUserInfo(name_input, fio_input)
		await updateUserAvatar()
		setIsEditing(false)
	}

	const updateUserAvatar = async() => {
		if (img == undefined)
			return

		let form_data = new FormData()

		form_data.append('image', img, img.name)

		const response = await api.put(`auth/image/`, form_data, {
			headers: {
				'content-type': 'multipart/form-data'
			}
		})

		if (response.status == 200) {
			console.log(response.data)
			setAvatar("http://127.0.0.1:9000/" + response.data["imageUrl"])
		}

	}

	return (
		<div className="profile-wrapper">

			<img src={image} className="user-avatar" alt=""/>

			<div className="user-info-wrapper">

				{isEditing ? (
					<CustomInput
						type="text"
						name="username"
						placeholder="Логин"
						value={name_input}
						setValue={setNameInput}
					/>
				) : (
					<span>Имя: {username}</span>
				)}

				{isEditing ? (
					<CustomInput
						type="text"
						name="fio"
						placeholder="ФИО"
						value={fio_input}
						setValue={setFioInput}
					/>
				) : (
					<span>ФИО: {fio}</span>
				)}

				<span>Статус: {is_moderator ? "Модератор" : "Пользователь"}</span>

				<div className="buttons-wrapper">
					{!isEditing && <CustomButton bg={variables.primary} onClick={handleEdit}>Изменить</CustomButton>}
					{isEditing && <CustomButton bg={variables.green} onClick={handleSave}>Сохранить</CustomButton> }
					{isEditing && <UploadButton bg={variables.primary} handleFileChange={handleFileChange}>Изменить аватарку</UploadButton> }

					<CustomButton bg={variables.primary} onClick={doLogOut}>Выйти</CustomButton>

				</div>

			</div>

		</div>
	)
}

export default ProfilePage;