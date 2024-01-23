import "./OrderPage.sass"
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {iOrdersMock, requestTime} from "../../Consts";
import {Order} from "../../Types";
import mockImage from "/src/assets/mock.png"

const OrderPage = ({ selectedOrder, setSelectedOrder }: { selectedOrder:Order | undefined, setSelectedOrder: Dispatch<Order| undefined>}) => {

    const { id } = useParams<{id: string}>();

    const [isMock, setIsMock] = useState<boolean>(false);

    useEffect(() => {
        fetchData()
    }, [])

    if (id == undefined){
        return;
    }

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:2023/api/units/${id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok)
            {
                CreateMock()
                return;
            }

            const service: Order = await response.json()

            setSelectedOrder(service)

            setIsMock(false)

        } catch
        {
            CreateMock()
        }

    };

    const CreateMock = () => {
        setSelectedOrder(iOrdersMock.find((service:Order) => service?.id == parseInt(id)))
        setIsMock(true)
    }

    const img = `http://127.0.0.1:9000/${selectedOrder?.imgUrl}`

    if (!selectedOrder) {
        return (
            <div className="page-details-wrapper">

            </div>
        )
    }

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2 className="name">{selectedOrder?.name}</h2>

                    <br />

                    <span>{selectedOrder?.description}</span>

                    <br />

                </div>

            </div>

        </div>
    )
}

export default OrderPage;