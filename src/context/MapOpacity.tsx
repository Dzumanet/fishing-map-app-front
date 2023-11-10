import {createContext, PropsWithChildren, useContext, useState} from "react";

export const MapOpacityContext  = createContext<null | string | any >(null);


export const MapOpacityProvider = (props: PropsWithChildren) => {
    const [mapOpacity, setMapOpacity] = useState<number>(1);


    return (
        <MapOpacityContext.Provider value={{
            mapOpacity, setMapOpacity,
        }}>
            {props.children}
        </MapOpacityContext.Provider>
    )
}
export const useMapOpacity = () => {
    return useContext(MapOpacityContext);
};
