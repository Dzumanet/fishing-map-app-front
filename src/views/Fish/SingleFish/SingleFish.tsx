import React, {SyntheticEvent, useContext, useEffect, useState} from "react";
import {API_ENDPOINTS} from "../../../api/endpoints";
import {FishWithUserInterface} from "types"
import {Link, useNavigate, useParams} from "react-router-dom";
import Cookies from "js-cookie";
import {LoginCheckContext} from "../../../context/Provider";

import './SingleFish.css';


export const SingleFish = () => {
    const { id } = useParams();
    const [fish,setFish] = useState<FishWithUserInterface | null>(null);
    const [message, setMessage] = useState('');
    const [showFish, setShowFish] = useState(true);
    const navigate = useNavigate();
    const UserId = Cookies.get('loggedUserId');

    useEffect(() => {
        (async () => {
            const res = await fetch(`${API_ENDPOINTS.GET_ONE_FISH}/${id}`, {

            });

            const data = await res.json();
            setFish(data)
        })()



    }, [id]);

    const removeFish = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_ENDPOINTS.DELETE_ONE_FISH}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if(response.status === 200) {
                const data = await response.json()
            if (data.success) {
                setMessage("Fish deleted successfully");
                setShowFish(false)

            }else {
                setMessage("Error deleted fish");
            }

            } else {
                setMessage("Server error: " + response.status);
            }
        } catch (error) {
            console.error("Client error:", error);
        }
    };



    if (fish === null) {
        return <p>Wczytywanie.....</p>
    }
    const isCurrentUserFish = fish.user.id === UserId;
    const editMyFish = () => {
        navigate(`/fish/edit/${id}`);
    };
    const handleMyFish = () => {
        navigate("/user/user-fish");
    };
    const handleMyMap = () => {
        navigate("/");
    };

    return (
        <div>
            {
                showFish ? (
                    <div className="single-fish-box">
                        <h1 className="fish-name">{fish.fishName}</h1>
                        <table className="fish-details">
                            <tbody>
                            <tr>
                                <td><strong>Weight:</strong></td>
                                <td>{fish.weight} kg</td>
                            </tr>
                            <tr>
                                <td><strong>Length:</strong></td>
                                <td>{fish.length} cm</td>
                            </tr>
                            <tr>
                                <td><strong>Description:</strong></td>
                                <td>{fish.description}</td>
                            </tr>
                            <tr>
                                <td><strong>Date and time:</strong></td>
                                <td>{new Date(fish.catchDateTime).toLocaleString()}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="button-container">
                            {isCurrentUserFish ? (
                                <div className="edit-buttons">
                                    <button onClick={editMyFish} className="edit-link">Edit Fish</button>
                                    <button onClick={removeFish} className="delete-link">Delete Fish</button>
                                </div>
                            ) : (
                                <p>
                                    Złapana przez użytkownika:{" "}
                                    <a href={`/user/${fish.user.id}`} className="user-link">{fish.user.userName}</a>
                                </p>
                            )}

                        </div>
                        <Link to={'/'}>Back to Home Page</Link>
                    </div>
                ) : (
                    <div className="delete-fish-message">
                        <p>{message}</p>
                        <button onClick={handleMyFish}>Back to My Fish</button>
                        <button onClick={handleMyMap}>Back to Map</button>

                    </div>
                )
            }
        </div>
    )
};