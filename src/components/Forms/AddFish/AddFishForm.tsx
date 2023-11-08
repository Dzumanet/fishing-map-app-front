import React, {SyntheticEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {LeafletMouseEvent} from "leaflet";
import {MapContainer, Marker, TileLayer, useMap} from "react-leaflet";
import {FishArray} from "../../../utils/FishArray";
import {API_ENDPOINTS} from "../../../api/endpoints";

const TextComponent = ({ value }: { value: number }) => <p>{value}</p>
export const AddFishForm = () => {
    const [form, setForm] = useState({
        fishName: '',
        weight: 0,
        description: '',
        catchDateTime: '',
        lat: 0,
        lon: 0,
    });
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(true);
    const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);

    const navigate = useNavigate();

    const handleMapClick = (e: LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        setForm({ ...form, lat: lat, lon: lng });
        setMarkerPosition({ lat, lng });
    };

    const MapClickHandler = () => {
        const map = useMap();

        map.on("click", handleMapClick);

        return null;
    };
    const updateForm = (key: string, value: number | string) => {
        setForm({ ...form, [key]: value });
    };

    const addFish = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(API_ENDPOINTS.ADD_FISH, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    fishName: form.fishName,
                    weight: form.weight,
                    description: form.description,
                    catchDateTime: form.catchDateTime,
                    lat: form.lat,
                    lon: form.lon
                }),
            });
            const data = await response.json();
            if (data.success) {
                setMessage("Fish added successfully");
                setShowForm(false);
            } else {
                setMessage("Error adding fish");
            }
        } catch (error) {
            setMessage("Error adding fish");
        }
    };

    const handleAddAnotherFish = () => {
        setForm({
            fishName: '',
            weight: 0,
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

    return (
        <div>
            {showForm ? (
                <>
                    <h2>Add Fish</h2>
                    <form onSubmit={addFish}>
                        <div>
                            <label>Fish Name</label>
                            <select
                                name="fishName"
                                value={form.fishName}
                                onChange={(e) => updateForm('fishName', e.target.value)}
                            >
                                <option value="">Select Fish</option>
                                {FishArray.map((fishName) => (
                                    <option key={fishName} value={fishName}>
                                        {fishName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Weight</label>
                            <input
                                type="number"
                                name="weight"
                                id="weight"
                                value={form.weight}
                                onChange={(e) => updateForm('weight', Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label>Description</label>
                            <input
                                type="text"
                                name="description"
                                id="description"
                                value={form.description}
                                onChange={(e) => updateForm('description', e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Time</label>
                            <input
                                type="datetime-local"
                                name="catchDateTime"
                                id="weight"
                                value={form.catchDateTime}
                                onChange={(e) => updateForm('catchDateTime', e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Latitude</label>
                            <TextComponent value={form.lat} />
                        </div>
                        <div>
                            <label>Longitude</label>
                            <TextComponent value={form.lon} />
                        </div>
                        <div>
                            <MapContainer center={[60.325, 11.09]} zoom={13} style={{ height: "400px", width: "100%" }}>
                                <MapClickHandler />
                                {markerPosition && <Marker position={markerPosition} />} {/* rysowanie markerów na mapie, jeśli jest dostępna pozycja */}
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />
                            </MapContainer>
                        </div>
                        <div>
                            <button type="submit">Add Fish</button>
                        </div>
                    </form>
                </>
            ) : (
                <>
                    <p>{message}</p>
                    <button onClick={handleAddAnotherFish}>Add Another Fish</button>
                    <button onClick={handleMyFish}>My Fish</button>
                </>
            )}
        </div>
    );
};