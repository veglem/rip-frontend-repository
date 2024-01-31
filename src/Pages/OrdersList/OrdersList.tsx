import "./OrdersList.sass"
import SearchBar from "../../Components/SearchBar/SearchBar";
import {useEffect, useState} from "react";
import OrderCard from "./OrderCard/OrderCard";
import {iOrdersMock, requestTime} from "../../Consts";
import {Order} from "../../Types";

const OrdersList = () => {

    const [orders, setOrders] = useState<Order[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchOrders = async () => {

        try {

            const response = await fetch(`http://localhost:2023/api/units?&filter=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const orders: Order[] = await response.json()

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setOrders(orders["units"])
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true);
        setOrders(iOrdersMock)

    }

    useEffect(() => {
        searchOrders()
    }, [query])

    const cards = orders.map(order  => (
        <OrderCard order={order} key={order.id} isMock={isMock}/>
    ))

    return (
        <div className="cards-list-wrapper">

            <div className="top">

                <h2>Поиск приказов</h2>

                <SearchBar query={query} setQuery={setQuery} />

            </div>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default OrdersList;