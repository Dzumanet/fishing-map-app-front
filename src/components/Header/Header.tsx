import React, {useContext, useState} from "react";
import {LoginCheckContext} from "../../context/Provider";
import {LoginForm} from "../Forms/Login/LoginForm";
import {Navbar} from "../Menu/Navbar";
import {useMapOpacity} from "../../context/MapOpacity";
import {RegisterForm} from "../Forms/Register/RegisterForm";

import './Header.css';

export const Header = () => {
    const {login} = useContext(LoginCheckContext);
    const [isVisibleRegister, setIsVisibleRegister] = useState(false);
    const [isVisibleLogin, setIsVisibleLogin] = useState(false);

    const {setMapOpacity} = useMapOpacity();

    const toggleLoginForm = () => {
        setIsVisibleLogin(!isVisibleLogin);
        setIsVisibleRegister(false);
        setMapOpacity(isVisibleLogin ? 1 : 0.4);
    };

    const toggleRegisterForm = () => {
        setIsVisibleRegister(!isVisibleRegister);
        setIsVisibleLogin(false);
        setMapOpacity(isVisibleRegister ? 1 : 0.4);
    };

    return (
        <div className="header">
            {login ? (
                <Navbar/>
            ) : (
                <div className="login-bar">
                    <h1>Welcome on Fishin Map</h1>
                    <div className="login-bar-button">
                        <button onClick={toggleLoginForm} className="custom-button">
                            {isVisibleLogin ? 'Close Login' : 'Login'}
                        </button>
                        {isVisibleLogin && <LoginForm/>}
                        <button onClick={toggleRegisterForm} className="custom-button">
                            {isVisibleRegister ? 'Close Register' : 'Register'}
                        </button>
                        {isVisibleRegister && <RegisterForm onClose={toggleLoginForm}/>}
                    </div>

                </div>
            )}
        </div>
    );
};