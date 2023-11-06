import React, {useContext} from "react";
import {Context} from "../provider/Provider";
import {Route, Routes} from "react-router-dom";
import {UserMap} from "../views/User/UserMap/UserMap";
import {UserFish} from "../views/User/UserFish/UserFish";
import {AddFishForm} from "../components/Forms/AddFish/AddFishForm";
import {Map} from "../components/Map/Map";

export const AppRoutes = () => {
    const {login} = useContext(Context);

    return (
        <Routes>
            <Route path="/" element={login ? <UserMap/> : <Map/>}/>
            <Route path="/user/user-fish" element={login ? <UserFish/> : <Map/>}/>
            <Route path="/user/add-fish" element={login ? <AddFishForm/> : <Map/>}/>
        </Routes>

    )
}