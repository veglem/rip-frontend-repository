import "./OrderCard.sass"
import {Order} from "../../../Types";
import {Link} from "react-router-dom";
import mockImage from "/src/assets/mock.png"

const OrderCard = ({ order, isMock }: {order:Order, isMock:boolean }) => {

    const img = `http://127.0.0.1:9000/${order.imgUrl}`

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={isMock ? mockImage : img}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {order.name} </h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/orders/${order.id}`}>
                        Подробнее
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default OrderCard;