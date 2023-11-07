import React from "react";

import {MapContainer, TileLayer} from "react-leaflet";


import 'leaflet/dist/leaflet.css'
import './Map.css';
import {useMapOpacity} from "../../provider/MapOpacity";

export const Map = () => {

    const {mapOpacity} = useMapOpacity();


    return (
        <div className="map" style={{opacity: mapOpacity}}>
            <MapContainer center={[60.321339, 11.063488]} zoom={13}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyring'>OpenStreetMap</a> & contributors"
                />

            </MapContainer>
        </div>
    );
};