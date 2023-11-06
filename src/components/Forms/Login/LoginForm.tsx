import React, {SyntheticEvent, useContext, useState} from "react";
import {RegisterForm} from "../Register/RegisterForm";
import {Context} from "../../../provider/Provider";
import Cookies from 'js-cookie';
import {API_ENDPOINTS} from "../../../api/endpoints";

export const LoginForm = () => {


    const {setLogin} = useContext(Context);
    const [userLogin, setUserLogin] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const sendLoginForm = async (e: SyntheticEvent) => {
        e.preventDefault();


        try {
            const res = await fetch(API_ENDPOINTS.LOGIN, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
                body: JSON.stringify({
                    userName: userLogin,
                    pwd: userPassword,
                })
            })
            const data = await res.json()
            if (data.loggedIn) {
                setLogin(true);
                Cookies.set('loggedUserId', data.userId);
                Cookies.set('loggedUserName', data.loggedUser);

            } else {
                setErrorMessage('Invalid username or password');

            }

        } finally {
            setUserLogin('');
            setUserPassword('');
        }
    }

    const handleRegisterClick = () => {
        setShowRegisterForm(!showRegisterForm);
    }



    return <>

        {!showRegisterForm && (

            <form className="login-contener" onSubmit={sendLoginForm}>
                <h2>Login</h2>


                <div className="login-box">

                    <div className="login-box-message">
                        {errorMessage && <p>{errorMessage}</p>}
                    </div>
                    <div className="login-input">
                        <label htmlFor="login">
                            <p>Login</p>
                            <input
                                id="login"
                                type="text"
                                value={userLogin}
                                onChange={e => setUserLogin(e.target.value)}
                            />
                        </label>


                        <label htmlFor="password">
                            <p>Password</p>
                            <input
                                id="password"
                                type="password"
                                value={userPassword}
                                onChange={e => setUserPassword(e.target.value)}
                            />
                        </label>

                        <button type="submit">Login</button>
                        <button onClick={handleRegisterClick}>Register</button>
                    </div>
                </div>



            </form>
        )}
        {showRegisterForm && <RegisterForm handleRegisterClick={handleRegisterClick}/>}

    </>
}
