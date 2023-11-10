import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {LeafletMouseEvent} from "leaflet";

export const useFishManagement = () => {
    const [form, setForm] = useState({
        fishName: '',
        weight: 0,
        length: 0,
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

    return {
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
    };
};