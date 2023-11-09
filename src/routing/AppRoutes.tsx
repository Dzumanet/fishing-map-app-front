import React, {useContext} from "react";
import {LoginCheckContext} from "../context/Provider";
import {Route, Routes} from "react-router-dom";
import {UserMap} from "../views/User/UserMap/UserMap";
import {UserFish} from "../views/User/UserFish/UserFish";
import {Map} from "../components/Map/Map";
import {UserInfo} from "../views/User/UserInfo/UserInfo";
import {SingleFish} from "../views/Fish/SingleFish/SingleFish";
import {AddFishForm} from "../components/Forms/AddFish/AddFishForm";
import {EditFishForm} from "../components/Forms/EditFishForm/EditFishForm";

export const AppRoutes = () => {
    const {login} = useContext(LoginCheckContext);

    return (
        <Routes>
            <Route path="/" element={login ? <UserMap/> : <Map/>}/>
            <Route path="/user/:id" element={<UserInfo/>}/>
            <Route path="/fish/:id" element={<SingleFish/>}/>
            <Route path="/fish/edit/:id" element={<EditFishForm/>}/>
            <Route path="/user/user-fish" element={login ? <UserFish/> : <Map/>}/>
            <Route path="/user/add-fish" element={login ? <AddFishForm/> : <Map/>}/>

        </Routes>

    )
}