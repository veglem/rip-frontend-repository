import "./Styles/Main.sass"
import "./Styles/Reset.sass"
import { useState } from 'react'
import Header from "./Components/Header/Header";
import {Order} from "./Types";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import OrderPage from "./Pages/OrderPage/OrderPage";
import OrdersList from "./Pages/OrdersList/OrdersList";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";

function App() {

    const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(undefined)

    return (
        <BrowserRouter basename="/bmstu">

            <div className="App">

                <div className="wrapper">

                    <Header />

                    <div className="content-wrapper">

                        <Breadcrumbs selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder}/>

                        <Routes>

                            <Route path="/" element={<Navigate to="/orders" replace />} />

                            <Route path="/profile" element={<ProfilePage />} />

                            <Route path="/orders" element={<OrdersList />} />

                            <Route path="/orders/:id" element={<OrderPage selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />} />

                        </Routes>

                    </div>

                </div>

            </div>

        </BrowserRouter>
    )
}

export default App
