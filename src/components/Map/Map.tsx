import React, {useEffect, useState} from "react";
import {FishInterface} from 'types'
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {useMapOpacity} from "../../provider/MapOpacity";

import 'leaflet/dist/leaflet.css'
import '../../utils/fix-map-icon'
import './Map.css';
import {API_ENDPOINTS} from "../../api/endpoints";
import {FishPopup} from "../FishPopup/FishPopup";

export const Map = () => {

    const [fish, setFish] = useState<FishInterface[]>([]);
    const {mapOpacity} = useMapOpacity();

    useEffect(() => {
        (async () => {
            const res = await fetch(API_ENDPOINTS.FISH_LIST)
            const data = await res.json()
            setFish(data)
        })()

    }, []);


    return (
        <div className="map" style={{opacity: mapOpacity}}>
            <MapContainer center={[60.321339, 11.063488]} zoom={13}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyring'>OpenStreetMap</a> & contributors"
                />
                {
                    fish.map(item => (
                        <Marker key={item.id} position={[item.lat, item.lon]}>
                            <Popup>
                                <FishPopup id={item.id}/>
                            </Popup>
                        </Marker>
                    ))
                }
            </MapContainer>
        </div>
    );
};