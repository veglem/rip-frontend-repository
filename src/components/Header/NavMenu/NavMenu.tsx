import "./NavMenu.sass"
import {Link} from "react-router-dom";
import {useAuth} from "../../../hooks/users/useAuth";
import {useEffect, useState} from "react";
import Hamburger from "../Hamburger/Hamburger";

const NavMenu = () => {

    const {is_moderator, is_authenticated, auth, avatarUrl} = useAuth()

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        auth()
    }, [])

    return (
        <div>

            <div className={"menu-wrapper " + (isOpen ? "open" : "")}>

                <Link to="/units" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                    <span>Факультеты</span>
                </Link>

                {is_moderator &&
                    <Link to="/units-table" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                        <span>Таблица факультетов</span>
                    </Link>
                }

                {is_authenticated &&
                    <Link to="/orders" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                        <span>Приказы</span>
                    </Link>
                }

                {is_authenticated &&
                    <Link to="/profile" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                        <img src={avatarUrl} className="user-avatar"/>
                    </Link>
                }

                {!is_authenticated &&
                    <Link to="/login" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                        <span>Вход</span>
                    </Link>
                }

            </div>

            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />

        </div>
    )
}

export default NavMenu;