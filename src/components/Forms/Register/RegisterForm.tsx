import React, {SyntheticEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {API_ENDPOINTS} from "../../../api/endpoints";


import '../LoginRegisterForm.css'

export const RegisterForm = ({onClose}: { onClose: () => void }) => {
    const [registerUserName, setRegisterUserName] = useState('');
    const [registerUserPwd, setRegisterUserPwd] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const navigate = useNavigate();

    const registerUser = async (e: SyntheticEvent) => {
        e.preventDefault();
        setErrorMessage('');
        try {
            const res = await fetch(API_ENDPOINTS.REGISTER, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    userName: registerUserName,
                    pwd: registerUserPwd,
                }),
            });

            const data = await res.json();

            if (data.exists) {
                setErrorMessage('User already exists');
            } else if (data.invalidLoginLength) {
                setErrorMessage('Username is too short');
            } else if (data.invalidPwdLength) {
                setErrorMessage('Password is too short');
            } else if (data.accountCreated) {
                setRegistrationSuccess(true);
                navigate('/')
            }
        } catch (error) {
            console.error('Error registering user:', error);
            setErrorMessage('An error occurred during registration.');
        }
    };

    if (registrationSuccess) {
        return (
            <div className="register-container">
                <div className="register-box">
                    <h2>Register</h2>

                    <div className="register-input">
                        <p>Account successfully created!</p>
                        <button onClick={onClose}>Login</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form className="register-container" onSubmit={registerUser}>
            <div className="register-box">
                <h2>Register</h2>
                <div className="register-input">
                    <label htmlFor="login">
                        <p>User Name</p>
                    </label>
                    <input
                        id="login"
                        type="text"
                        value={registerUserName}
                        onChange={(e) => setRegisterUserName(e.target.value)}
                    />
                    <label htmlFor="password">
                        <p>Password</p>
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={registerUserPwd}
                        onChange={(e) => setRegisterUserPwd(e.target.value)}
                    />
                    <button type="submit">Create account</button>
                </div>
                <div className="register-box-message">
                    {errorMessage && <p>{errorMessage}</p>}
                </div>
            </div>
        </form>
    );
};