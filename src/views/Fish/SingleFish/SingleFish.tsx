import React, {useEffect, useState} from "react";
import {API_ENDPOINTS} from "../../../api/endpoints";
import {FishWithUserInterface} from "types"
import {Link, useParams} from "react-router-dom";
import Cookies from "js-cookie";



export const SingleFish = () => {
    const { id } = useParams();
    const [fish,setFish] = useState<FishWithUserInterface | null>(null)

    const UserId = Cookies.get('loggedUserId');

    useEffect(() => {
        (async () => {
            const res = await fetch(`${API_ENDPOINTS.GET_ONE_FISH}/${id}`, {

            });

            const data = await res.json();
            setFish(data)
        })()


    }, [id]);

    if (fish === null) {
        return <p>Wczytywanie.....</p>
    }
    const isCurrentUserFish = fish.user.id === UserId;


    return (
       <div>
           <h1>{fish.fishName}</h1>
           <p>Waga: {fish.weight}</p>
           <p>Opis: {fish.description}</p>
           <p>Data i godzina złapania: {new Date(fish.catchDateTime).toLocaleString()}</p>
           <p>
               {isCurrentUserFish ? (
                   <Link to={`/fish/edit/${id}`}>Edytuj tę rybę</Link>
               ) : (
                   <p>Złapana przez użytkownika:
                       <Link to={`/user/${fish.user.id}`}>{fish.user.userName}</Link>
                       </p>
               )}
           </p>
       </div>
    )
}