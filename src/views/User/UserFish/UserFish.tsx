import React, {useEffect, useState} from "react";
import {GetListOfFishResponse} from 'types'
import {API_ENDPOINTS} from "../../../api/endpoints";
import {Link} from "react-router-dom";

import './UserFish.css';

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

    const sortByWeight = () => {
        setUserFish([...userFish.sort((a, b) => b.weight - a.weight)]);
    };

    const sortByLength = () => {
        setUserFish([...userFish.sort((a, b) => b.length - a.length)]);
    };

    const sortByDateTime = () => {
        setUserFish([...userFish.sort((a, b) => new Date(b.catchDateTime).getTime() - new Date(a.catchDateTime).getTime())]);
    };

    const sortAlphabetically = () => {
        setUserFish([...userFish.sort((a, b) => a.fishName.localeCompare(b.fishName))]);
    };

    return (
        <div className="fish-container">
            <div className="sort-buttons">
                <button onClick={sortByWeight}>Sort by Weight</button>
                <button onClick={sortByLength}>Sort by Length</button>
                <button onClick={sortByDateTime}>Sort by Date and Time</button>
                <button onClick={sortAlphabetically}>Sort Alphabetically</button>
            </div>
            <h1>My Fish</h1>
            <h2>Total number of fish caught: {userFish.length}</h2>

            <div className="fish-list">
                {userFish.map((fish) => (
                    <Link key={fish.id} to={`/fish/${fish.id}`}>
                        <div className="fish-box">
                            <h3>Name: {fish.fishName}</h3>
                            <p>Weight: {fish.weight}</p>
                            <p>Length: {fish.length}</p>
                            <p>Date and time: {new Date(fish.catchDateTime).toLocaleString()}</p>
                        </div>
                    </Link>))}
            </div>
        </div>

    );
};