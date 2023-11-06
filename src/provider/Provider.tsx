import {createContext, PropsWithChildren, useState} from "react";

export const Context = createContext<null | string | any >(null);


export const Provider = (props: PropsWithChildren) => {
    const [login, setLogin] = useState<boolean>(false);


    return (
        <Context.Provider value={{
            login, setLogin,
        }}>
            {props.children}
        </Context.Provider>
    )
}