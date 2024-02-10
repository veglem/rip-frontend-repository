import "./ProfilePage.sass"
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import CustomButton from "../../components/CustomButton/CustomButton";
import avatar from "/src/assets/avatar.png"
import {useEffect, useState} from "react";
import {variables} from "../../utils/consts";
import CustomInput from "../../components/CustomInput/CustomInput";

const ProfilePage = () => {

	const navigate = useNavigate()

	const {is_authenticated, is_moderator, username, fio, logOut, updateUserInfo} = useAuth()

	const [isEditing, setIsEditing] = useState(false)

	const [name_input, setNameInput] = useState<string>(username)
	const [fio_input, setFioInput] = useState<string>(fio)

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
		setIsEditing(false)
	}

	return (
		<div className="profile-wrapper">

			<img src={avatar} className="user-avatar" alt=""/>

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
					{isEditing ?
						<CustomButton bg={variables.green} onClick={handleSave}>Сохранить</CustomButton>:
						<CustomButton bg={variables.primary} onClick={handleEdit}>Изменить</CustomButton>
					}

					<CustomButton bg={variables.primary} onClick={doLogOut}>Выйти</CustomButton>
				</div>

			</div>

		</div>
	)
}

export default ProfilePage;