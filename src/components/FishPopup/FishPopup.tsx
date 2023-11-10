import React, {useEffect, useState} from "react";
import {FishWithUserInterface} from "types"
import Cookies from "js-cookie";
import {Link} from "react-router-dom";
import {API_ENDPOINTS} from "../../api/endpoints";

interface Props {
    id: string;
}

export const FishPopup = (props: Props) => {
    const [fish,setFish] = useState<FishWithUserInterface | null>(null)

    const UserId = Cookies.get('loggedUserId');

    useEffect(() => {
        (async () => {
            const res = await fetch(`${API_ENDPOINTS.GET_ONE_FISH}/${props.id}`, {

            });

            const data = await res.json();
            setFish(data);
        })()


    }, [props.id]);

    if (fish === null) {
        return <p>Wczytywanie.....</p>
    }

    return <>
        <h3><Link to={`/fish/${fish.id}`}>{fish.fishName}</Link></h3>
        <p>{fish.user.id === UserId ? "My fish" : "Fish caught by the user:"}</p>
        {fish.user.id !== UserId && (<p>{fish.user.userName}</p>

        )};

        {!!fish.weight && <p>Weight: {fish.weight} kg</p>}
        {!!fish.length && <p>Length: {fish.length} cm</p>}


    </>;
};