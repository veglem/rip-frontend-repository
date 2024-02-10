import {useEffect, useState} from "react";
import {useOrder} from "../../hooks/orders/useOrder";
import {useNavigate, useParams} from "react-router-dom"
import UnitCard from "../../components/UnitCard/UnitCard";
import "./OrderPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import {STATUSES, variables} from "../../utils/consts";
import {ru} from "../../utils/momentLocalization";
import moment from "moment";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomInput from "../../components/CustomInput/CustomInput";

const OrderPage = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const navigate = useNavigate()

    const { id } = useParams<{id: string}>();

    const {order, name, description, setName, setDescription, fetchOrder, saveOrder, sendOrder, deleteOrder, setOrder, setOrderId} = useOrder()

    useEffect(() => {

        if (!id || !is_authenticated) {
            navigate("/")
        }

        setOrderId(id)
        fetchOrder(id)

        return () => {
            setOrder(undefined)
        };
    }, [])

    if (order == undefined)
    {
        return (
            <div className="order-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const onSendOrder = async() => {
        await saveOrder()
        await sendOrder()
        navigate("/orders")
    }

    const onDeleteOrder = async () => {
        await deleteOrder()
        navigate("/units")
    }

    const cards = order.units.map(unit  => (
        <UnitCard unit={unit} key={unit.id} />
    ))

    const ButtonsContainer = () => {
        return (
            <div className="buttons-wrapper">

                <CustomButton onClick={saveOrder} bg={variables.green}>Сохранить</CustomButton>

                <CustomButton onClick={onSendOrder} bg={variables.primary}>Отправить</CustomButton>

                <CustomButton onClick={onDeleteOrder} bg={variables.red}>Удалить</CustomButton>

            </div>
        )
    }

    const is_draft = order.status == 1

    const completed = [3, 4].includes(order.status)

    return (
        <div className="order-page-wrapper">

            <div className="order-units-wrapper">
                <div className="top">
                    <h3>{is_draft ? "Новый приказ" :  "Приказ №" + order.id}</h3>
                </div>

                <div className="order-info-container">
                    <span>Статус: {STATUSES.find(status => status.id == order.status).name}</span>
                    <span>Дата создания: {moment(order.creationDate).locale(ru()).format("D MMMM HH:mm")}</span>
                    {[2, 3, 4].includes(order.status) && <span>Дата формирования: {moment(order.formationDate).locale(ru()).format("D MMMM HH:mm")}</span>}
                    {completed && <span>Дата завершения: {moment(order.endDate).locale(ru()).format("D MMMM HH:mm")}</span> }
                    {[2, 3, 4].includes(order.status) }
                </div>

                <div className="inputs-container">

                    <CustomInput placeholder="Название" value={name} setValue={setName} disabled={!is_draft} />
                    <CustomTextarea placeholder="Описание" value={description} setValue={setDescription} disabled={!is_draft} />

                </div>

                <div className="title">
                    <h3>Факультеты</h3>
                </div>

                <div className="bottom">

                    {cards}

                </div>
            </div>

            {!is_moderator && is_draft && <ButtonsContainer />}

        </div>
    )
}

export default OrderPage