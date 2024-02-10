import CustomButton from "../CustomButton/CustomButton";
import {Link} from "react-router-dom";

const CustomLink = ({to, bg, children}) => {
    return (
        <Link to={to} style={{textDecoration:"None"}}>
            <CustomButton bg={bg}>{children}</CustomButton>
        </Link>
    )
}

export default CustomLink