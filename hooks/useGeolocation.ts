import { useState, useCallback } from 'react';

type Position = {
    lat: number;
    lon: number;
};

type GeolocationError = {
    code: number;
    message: string;
};

export const useGeolocation = () => {
    const [position, setPosition] = useState<Position | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<GeolocationError | null>(null);

    const requestLocation = useCallback(() => {
        setIsLoading(true);
        setError(null);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setPosition({ lat: pos.coords.latitude, lon: pos.coords.longitude });
                    setIsLoading(false);
                },
                (err) => {
                    setError({ code: err.code, message: err.message });
                    setIsLoading(false);
                },
                { timeout: 10000, enableHighAccuracy: true }
            );
        } else {
            setError({ code: 0, message: "Geolocation is not supported by this browser." });
            setIsLoading(false);
        }
    }, []);

    return { position, isLoading, error, requestLocation };
};
