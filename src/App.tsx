import React, {useContext, useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import {Header} from "./components/Header/Header";
import {AppRoutes} from "./routing/AppRoutes";
import {LoginCheckContext} from "./context/Provider";
import {API_ENDPOINTS} from "./api/endpoints";
import {MapOpacityProvider} from "./context/MapOpacity";

import './App.css';
export const App = () => {
    const {setLogin} = useContext(LoginCheckContext);

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
                <MapOpacityProvider>
                <Header/>
                <AppRoutes/>
                </MapOpacityProvider>
            </BrowserRouter>
        </>
    );
};

