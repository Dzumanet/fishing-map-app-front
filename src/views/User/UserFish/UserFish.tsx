import React, {useEffect, useState} from "react";
import {GetListOfFishResponse} from 'types'
import {API_ENDPOINTS} from "../../../api/endpoints";

import './UserFish.css'
export const UserFish = () => {
    const [userFish, setUserFish] = useState<GetListOfFishResponse>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch(API_ENDPOINTS.USER_FISH, {
                credentials: "include",
            });
            const data = await res.json()
            console.log('data z userFish', data)
            setUserFish(data)
        })()
    }, []);


    return (
        <div className="fish-container">
            <h1>User Fish</h1>
            <h2>{userFish.length}</h2>

            <div className="fish-list">
                {userFish.map((fish) => (
                    <div key={fish.id} className="fish-box">
                        <h3>Name: {fish.fishName}</h3>
                        <p>Weight: {fish.weight}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}