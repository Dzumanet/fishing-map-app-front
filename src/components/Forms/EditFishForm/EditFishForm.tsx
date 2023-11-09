import React, {SyntheticEvent, useEffect} from "react";
import {useParams} from "react-router-dom";
import {API_ENDPOINTS} from "../../../api/endpoints";
import {FishForm} from "../FishForm/FishForm";
import {CreateFishResponse} from "types";

import './EditFishForm.css'
import {useFishManagement} from "../../../hooks/useFishManagement";

export const EditFishForm = () => {
    const isEditing = true;
    const {id} = useParams();
    const {
        form,
        setForm,
        message,
        setMessage,
        showForm,
        setShowForm,
        markerPosition,
        setMarkerPosition,
        navigate,
        handleMapClick,
    } = useFishManagement();
    const updateForm = (key: string, value: number | string) => {
        setForm({...form, [key]: value});
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_ENDPOINTS.GET_ONE_FISH}/${id}`);
                const data = await response.json();
                if (response.ok) {
                    data.catchDateTime = formatCatchDateTime(data.catchDateTime);

                    setForm(data);

                    setMarkerPosition({lat: data.lat, lng: data.lon});
                } else {
                    setMessage("Error while fetching fish data");
                }
            } catch (error) {
                setMessage("Error while fetching fish data");
            }
        };

        fetchData();

    }, [id]);

    const formatCatchDateTime = (catchDateTime: Date) => {
        const dateObject = new Date(catchDateTime);
        return dateObject.toISOString().slice(0, 16);
    };

    const editFish = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_ENDPOINTS.EDIT_ONE_FISH}/${id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({
                    fishName: form.fishName,
                    weight: form.weight,
                    description: form.description,
                    catchDateTime: form.catchDateTime,
                    lat: form.lat,
                    lon: form.lon,
                }),
            });

            if (response.status === 200) {
                const data: CreateFishResponse = await response.json();
                if (data.success) {
                    setMessage("Fish edited successfully");
                    setShowForm(false);
                } else {
                    setMessage("Error editing fish");
                }
            } else {
                setMessage("Server error: " + response.status);
            }
        } catch (error) {
            console.error("Client error:", error);
            setMessage("Error editing fish");
        }
    };

    const handleMyFish = () => {
        navigate("/user/user-fish");
    };

    const handleMyMap = () => {
        navigate("/");
    };

    return (
        <div>
            {showForm ? (
                <FishForm
                    form={form}
                    onFormChange={(key, value) => updateForm(key, value)}
                    onSubmit={editFish}
                    onMapClick={handleMapClick}
                    markerPosition={markerPosition}
                    showForm={showForm}
                    message={message}
                    isEditing={isEditing}
                />
            ) : (
                <div className="add-fish-message">
                    <p>{message}</p>
                    <button onClick={handleMyMap}>My Map</button>
                    <button onClick={handleMyFish}>My Fish</button>

                </div>
            )}
        </div>
    );
};