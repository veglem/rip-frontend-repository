import "./UnitCard.sass"
import {Unit} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useOrder} from "../../hooks/orders/useOrder";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";
import {useEffect, useState} from "react";
import {useUnits} from "../../hooks/units/useUnits";
import CustomLink from "../CustomLink/CustomLink";

const UnitCard = ({ unit, refetch }: {unit:Unit}) => {

    const {is_authenticated, is_moderator} = useAuth()

    const {is_draft, addUnitToOrder, deleteUnitFromOrder} = useOrder()

    const handleAddUnit = async (e) => {
        e.preventDefault()
        await addUnitToOrder(unit)
        refetch()
    }

    const handleDeleteUnitFromOrder = async (e) => {
        e.preventDefault()
        await deleteUnitFromOrder(unit)
    }

    const img = `http://127.0.0.1:9000/${unit.imgUrl}`

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={img}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title">{unit.name}</h3>

                </div>

                <div className="content-bottom">

                    <CustomLink to={`/units/${unit.id}`} bg={variables.primary}>
                        Подробнее
                    </CustomLink>

                    {is_authenticated && !is_moderator && location.pathname.includes("units") &&
                        <CustomButton onClick={handleAddUnit} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("orders") &&
                        <CustomButton onClick={handleDeleteUnitFromOrder} bg={variables.red}>Удалить</CustomButton>
                    }
                    
                </div>

            </div>

        </div>
    )
}

export default UnitCard;