import React, {useContext} from "react";
import {Context} from "../../provider/Provider";
import {LoginForm} from "../Forms/Login/LoginForm";
import {Navbar} from "../Menu/Navbar";

export const Header = () => {
    const {login} = useContext(Context);


    return (
        <div className="header">

            {login ? (
                <Navbar/>
            ) : (
                <LoginForm />
            )}
        </div>
    );
}