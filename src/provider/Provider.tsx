import {createContext, PropsWithChildren, useState} from "react";

export const LoginCheckContext = createContext<null | string | any >(null);


export const Provider = (props: PropsWithChildren) => {
    const [login, setLogin] = useState<boolean>(false);


    return (
        <LoginCheckContext.Provider value={{
            login, setLogin,
        }}>
            {props.children}
        </LoginCheckContext.Provider>
    )
}