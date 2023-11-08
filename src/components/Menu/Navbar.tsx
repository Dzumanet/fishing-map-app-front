import React, {useContext} from "react";
import {LoginCheckContext} from "../../provider/Provider";
import {Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {API_ENDPOINTS} from "../../api/endpoints";


import './Navbar.css'

export const Navbar = () => {


    const {setLogin} = useContext(LoginCheckContext);
    const navigate = useNavigate();

    const UserName = Cookies.get('loggedUserName');


    const logOut = async () => {
        try {
            await fetch(API_ENDPOINTS.LOGOUT, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            setLogin(false);
            Cookies.remove('loggedUserId');
            Cookies.remove('loggedUserName');
            navigate('/');
        } catch (error) {
            console.error("An error occurred during logout:", error);
        }
    };

    return (
        <div className="menu">
            <div className="hello-message">
                <h1>Witaj {UserName}</h1>
            </div>
            <nav className="nav-bar">
                <ul>
                    <li>
                        <Link to="/">Mapa</Link>
                    </li>
                    <li>
                        <Link to="/user/user-fish">Moje Ryby</Link>
                    </li>
                    {/*<li>*/}
                    {/*    <Link to="/user/user-trip">Moje Wyprawy</Link>*/}
                    {/*</li>*/}
                    <li>
                        <Link to="/user/add-fish">Dodaj rybe</Link>
                    </li>
                    {/*<li>*/}
                    {/*    <Link to="/user/add-trip">Dodaj wyprawę</Link>*/}
                    {/*</li>*/}

                </ul>
            </nav>

            <div className="logout-button">
                <button onClick={logOut}>Wyloguj</button>
            </div>

        </div>
    )

}