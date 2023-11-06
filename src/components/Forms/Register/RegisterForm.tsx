import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {API_ENDPOINTS} from "../../../api/endpoints";



export const RegisterForm = ({handleRegisterClick}: { handleRegisterClick: () => void }) => {
    const [registerUserName, setRegisterUserName] = useState('');
    const [registerUserPwd, setRegisterUserPwd] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const registerUser = async () => {

        try {
            const res = await fetch(API_ENDPOINTS.REGISTER, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
                body: JSON.stringify({
                    userName: registerUserName,
                    pwd: registerUserPwd,
                })
            })
            const data = await res.json()
            if (data.exists) {
                setErrorMessage("User already exists");
            } else if (data.invalidLength) {
                setErrorMessage("Username is too short");
            } else if (data.accountCreated) {
                handleRegisterClick();
                console.log('Redirecting to login');
                navigate("/login");

            }
        } finally {
            handleRegisterClick();
            console.log('Redirecting to login');
        }

    }
    const handleBackToLoginClick = () => {
        handleRegisterClick();
    };

    return <>
        <form action="" onSubmit={registerUser}>
            <h2>Register</h2>
            <div className="register-box">
                <div className="register-box-message">
                    {errorMessage && <p> {errorMessage}</p>}
                </div>
                <div className="register-input">
                    <label htmlFor="login">
                        <p>User Name</p>
                    </label>
                    <input
                        id="login"
                        type="text"
                        onChange={(e) => setRegisterUserName(e.target.value)}
                    />
                    <label htmlFor="password">
                        <p>Password</p>
                    </label>
                    <input
                        id="password"

                        type="password"
                        onChange={(e) => setRegisterUserPwd(e.target.value)}
                    />


                    <button>Create account</button>
                    <button onClick={handleBackToLoginClick}>Back to Login</button>
                </div>
            </div>
        </form>
    </>


}