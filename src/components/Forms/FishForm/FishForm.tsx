import React, {SyntheticEvent} from "react";
import {LeafletMouseEvent} from "leaflet";
import {MapContainer, Marker, TileLayer, useMap} from "react-leaflet";
import {FishArray} from "../../../utils/FishArray";
import {TextComponent} from "../../TextComponent/TextComponent";

interface FishFormProps {
    form: {
        fishName: string;
        weight: number;
        description: string;
        catchDateTime: string;
        lat: number;
        lon: number;
    };
    onFormChange: (key: string, value: number | string) => void;
    onSubmit: (e: SyntheticEvent) => void;
    onMapClick: (e: LeafletMouseEvent) => void;
    markerPosition: { lat: number; lng: number } | null;
    showForm: boolean;
    message: string;
    isEditing: boolean;
}

export const FishForm = ({
                             form,
                             onFormChange,
                             onSubmit,
                             onMapClick,
                             markerPosition,
                             showForm,
                             message,
                             isEditing,
                         }: FishFormProps) => {

    return (
        <div className="add-form">
            <form onSubmit={onSubmit}>
                <h2>{isEditing ? "Edit Fish" : "Add Fish"}</h2>
                <label>Fish Name</label>
                <select
                    name="fishName"
                    value={form.fishName}
                    onChange={(e) => onFormChange("fishName", e.target.value)}
                    required
                >
                    <option value="">Select Fish</option>
                    {FishArray.map((fishName) => (
                        <option key={fishName} value={fishName}>
                            {fishName}
                        </option>
                    ))}
                </select>

                <label>Weight</label>
                <input
                    type="number"
                    name="weight"
                    id="weight"
                    value={form.weight}
                    onChange={(e) => onFormChange("weight", Number(e.target.value))}
                    required
                />
                {form.weight <= 0 && (
                    <span style={{color: "red"}}>Weight must be greater than 0</span>
                )}

                <label>Description</label>
                <textarea
                    rows={4}
                    name="description"
                    id="description"
                    value={form.description}
                    onChange={(e) => onFormChange("description", e.target.value)}
                />
                <label>Time</label>
                <input
                    type="datetime-local"
                    name="catchDateTime"
                    id="catchDateTime"
                    value={form.catchDateTime}
                    onChange={(e) => onFormChange("catchDateTime", e.target.value)}
                />
                <table>
                    <tbody>
                    <tr>
                        <td>Latitude:</td>
                        <td>
                            <TextComponent value={form.lat}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Longitude:</td>
                        <td>
                            <TextComponent value={form.lon}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div>
                    <button type="submit">{isEditing ? "Save" : "Add Fish"}</button>
                </div>
            </form>
            <div>
                <MapContainer center={[60.325, 11.09]} zoom={13} style={{height: "50vh", width: "90%", margin: "auto"}}>
                    <MapClickHandler onMapClick={onMapClick}/>
                    {markerPosition && <Marker position={markerPosition}/>}
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                </MapContainer>
            </div>
        </div>
    );
};

const MapClickHandler = ({onMapClick}: { onMapClick: (e: LeafletMouseEvent) => void }) => {
    const map = useMap();
    map.on("click", onMapClick);
    return null;
};

