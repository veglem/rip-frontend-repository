import React from "react";
import "./OrdersTable.sass"
import {STATUSES, variables} from "/src/utils/consts";
import {ru} from "/src/utils/momentLocalization";
import moment from "moment";
import {useQuery} from "react-query";
import {useOrders} from "../../../hooks/orders/useOrders";
import {useCustomTable} from "../../../hooks/other/useCustomTable";
import CustomTable from "../../../components/CustomTable/CustomTable";
import {useNavigate} from "react-router-dom"
import OrdersFilters from "../OrdersFilters/OrdersFilters"
import CustomButton from "../../../components/CustomButton/CustomButton"
import {useAuth} from "../../../hooks/users/useAuth"
import {api} from "../../../utils/api";

const OrdersTable = () => {

    const {is_moderator} = useAuth()

    const navigate = useNavigate()

    const {searchOrders} = useOrders()

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Статус",
            accessor: "status",
            Cell: ({ value }) => { return STATUSES.find(status => status.id == value).name }
        },
        {
            Header: "Дата формирования",
            accessor: "formationDate",
            Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
        },
        {
            Header: "Дата завершнения",
            accessor: "endDate",
            Cell: ({ value }) => {
                if (!value) {
                    return "Нет"
                }

                return moment(value).locale(ru()).format("D MMMM HH:mm")
            }
        },
        {
            Header: "Подписано ректором",
            accessor: "sign",
            Cell: ({ value }) => {
                if (!value) {
                    return "Нет"
                }

                return "Да"
            }
        }
    ]

    if (is_moderator) {
        columns.push({
            Header: "Пользователь",
            accessor: "creator",
            Cell: ({ value }) => { return value }
        })

        columns.push({
            Header: "Действие",
            accessor: "accept_button",
            Cell: ({ cell }) => (
                is_moderator && cell.row.values.status == 2 && <CustomButton bg={variables.green} onClick={(e) => acceptOrder(cell.row.values.id)}>Принять</CustomButton>
            )
        })

        columns.push({
            Header: "Действие",
            accessor: "dismiss_button",
            Cell: ({ cell }) => (
                is_moderator && cell.row.values.status == 2 && <CustomButton bg={variables.red} onClick={(e) => dismissOrder(cell.row.values.id)}>Отклонить</CustomButton>
            )
        })
    }

    const acceptOrder = async (order_id) => {

        const response = await api.put(`orders/${order_id}/update_status_moderator?status=3`)

        if (response.status == 200) {
            refetch()
        }
    }

    const dismissOrder = async (order_id) => {

        const response = await api.put(`orders/${order_id}/update_status_moderator?status=4`)

        if (response.status == 200) {
            refetch()
        }
    }
    
    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["orders"],
        () => searchOrders(),
        {
            keepPreviousData: false,
        }
    )

    const {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    } = useCustomTable(
        columns,
        isSuccess,
        data
    )

    const handleClick = (order_id) => {
        navigate(`/orders/${order_id}`)
    }

    return (
        <div className="orders-table-wrapper">

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={handleClick}
            >
                <OrdersFilters refetch={refetch}/>
            </CustomTable>

        </div>
    )
}

export default OrdersTable