import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {GetListOfFishResponse} from "types"
import {API_ENDPOINTS} from "../../../api/endpoints";



export const FishList = () => {
    const [fishList, setFishList] = useState<GetListOfFishResponse>([]);

    useEffect(() => {
        const fetchFishList = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.FISH_LIST);
                const data = await response.json();
                if (data.length > 0) {
                    setFishList(data);
                }
                console.log(data)

            } catch (error) {
                console.error(error);
            }
        };

        fetchFishList();
    }, []);


    return (
        <div>
            <h2>Fish List</h2>
            <Link to="/fish/add">Add Fish</Link>
            <h2>{fishList.length}</h2>
            <ul>
                {fishList.map((fish) => (
                    <li key={fish.id}>
                        {fish.fishName} - {fish.weight} kg
                        <Link to={`/fish/edit/${fish.id}`}>Edit</Link>
                        {/*<button onClick={() => handleDelete(fish.id)}>Delete</button>*/}
                    </li>
                ))}
            </ul>
        </div>
    );
};

