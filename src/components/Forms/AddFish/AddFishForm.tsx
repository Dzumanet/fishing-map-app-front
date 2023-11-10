import React, {SyntheticEvent} from "react";
import {API_ENDPOINTS} from "../../../api/endpoints";
import {FishForm} from "../FishForm/FishForm";
import {useFishManagement} from "../../../hooks/useFishManagement";
import {CreateFishResponse} from "types";

export const AddFishForm = () => {
    const isEditing = false;
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

    const addFish = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(API_ENDPOINTS.ADD_FISH, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({
                    fishName: form.fishName,
                    weight: form.weight,
                    length: form.length,
                    description: form.description,
                    catchDateTime: form.catchDateTime,
                    lat: form.lat,
                    lon: form.lon,
                }),
            });
            if (response.status === 201) {
                const data: CreateFishResponse = await response.json();
                if (data.success) {
                    setMessage("Fish added successfully");
                    setShowForm(false);
                } else {
                    setMessage("Error adding fish");
                }
            } else {
                setMessage("Server error: " + response.status);
            }
        } catch (error) {
            console.error("Client error:", error);
            setMessage("Error adding fish");
        }
    };

    const handleAddAnotherFish = () => {
        setForm({
            fishName: '',
            weight: 0,
            length: 0,
            description: '',
            catchDateTime: '',
            lat: 0,
            lon: 0,
        });
        setShowForm(true);
        setMessage("");
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
                    onFormChange={(key, value) => setForm({...form, [key]: value})}
                    onSubmit={addFish}
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
                    <button onClick={handleAddAnotherFish}>Add Another Fish</button>

                </div>
            )}
        </div>
    );
};
