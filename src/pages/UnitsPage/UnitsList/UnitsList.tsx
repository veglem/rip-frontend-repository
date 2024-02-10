import "./UnitsList.sass"
import UnitCard from "../../../components/UnitCard/UnitCard";
import {useUnits} from "../../../hooks/units/useUnits";
import {useQuery} from "react-query";
import UnitsFilters from "../UnitsFilters/UnitsFilters";

const UnitsList = () => {

    const {searchUnits} = useUnits()

    const { isLoading, data, refetch } = useQuery(
        ["units"],
        () => searchUnits(),
        {
            refetchInterval: 1000,
            refetchOnWindowFocus: false,
            cacheTime: 0,
            keepPreviousData: false,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    const cards = data.map(unit  => (
        <UnitCard unit={unit} key={unit.id} refetch={refetch}/>
    ))

    return (
        <div className="units-list-wrapper">

            <UnitsFilters refetch={refetch}/>

            <div className="units-list">
                { cards }
            </div>

        </div>
    )
}

export default UnitsList;