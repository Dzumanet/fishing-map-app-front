import React, {ChangeEvent, useEffect, useState} from "react";
import {UserFishSelection} from "../../../components/Select/UserFishSelection";
import {FishSelectComponent} from "../../../components/Select/FishSelection";
import {FishArray} from "../../../utils/FishArray";
import {FishInterface} from 'types';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {API_ENDPOINTS} from "../../../api/endpoints";
import {FishPopup} from "../../../components/FishPopup/FishPopup";

import './UserMap.css';
export const UserMap = () => {

    const [fish, setFish] = useState<FishInterface[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>("userFish");
    const [selectedFish, setSelectedFish] = useState<string | null>(null);

    const allFish = fish;

    const handleOptionChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);
        if (selectedValue === "userFish") {
            setFish(allFish);
        }
    };

    const handleFishChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedFish = e.target.value;
        setSelectedFish(selectedFish);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = "";
                if (selectedOption === "userFish") {
                    url = API_ENDPOINTS.USER_FISH;
                } else if (selectedOption === "allFish") {
                    url = API_ENDPOINTS.FISH_LIST;
                }

                const response = await fetch(url, {
                    credentials: "include",
                });
                const data = await response.json();
                setFish(data);
            } catch (error) {
                console.log("Error:", error);
            }
        };


        fetchData();

    }, [selectedOption]);


    return (
        <div className="map">
            <div className="fish-selection">
            <UserFishSelection selectedOption={selectedOption} handleOptionChange={handleOptionChange}/>
            <FishSelectComponent selectedFish={selectedFish} handleFishChange={handleFishChange}
                                 fishListArray={FishArray}/>
            </div>
            <MapContainer center={[60.321339, 11.063488]} zoom={13}>
                {/*<MapClickHandler />*/}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyring'>OpenStreetMap</a> & contributors"
                />

                {fish.map((item) => {
                    if (!selectedFish || item.fishName === selectedFish) {
                        return (
                            <Marker key={item.id} position={[item.lat, item.lon]}>
                                <Popup>
                                    <FishPopup id={item.id}/>
                                </Popup>
                            </Marker>
                        );
                    }
                    return null;
                })}
            </MapContainer>
        </div>
    );
};