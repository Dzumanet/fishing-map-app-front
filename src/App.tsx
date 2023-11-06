import React, {useContext, useEffect} from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Header} from "./components/Header/Header";
import {AppRoutes} from "./routing/AppRoutes";
import {Context} from "./provider/Provider";
import {API_ENDPOINTS} from "./api/endpoints";

export const App = () => {
    const {setLogin} = useContext(Context);

    useEffect(() => {
        const logIn = async () => {
            const response = await fetch(API_ENDPOINTS.CHECK, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
            });
            const data = await response.json();
            if (data.loggedIn) {
                setLogin(true);
            }
        };

        logIn();
    });


    return (
        <>
            <BrowserRouter>
                <Header/>
                <AppRoutes/>
            </BrowserRouter>
        </>
    );
}

