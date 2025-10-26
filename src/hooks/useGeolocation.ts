import { useState, useCallback } from 'react';

interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  timestamp: number;
}

interface GeolocationError {
  code: number;
  message: string;
}

interface UseGeolocationState {
  isLoading: boolean;
  position: GeolocationPosition | null;
  error: GeolocationError | null;
  requestLocation: () => void;
}

export const useGeolocation = (defaultPosition: GeolocationPosition | null = null): UseGeolocationState => {
  const [position, setPosition] = useState<GeolocationPosition | null>(defaultPosition);
  const [error, setError] = useState<GeolocationError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const requestLocation = useCallback(() => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError({ code: 0, message: 'Geolocation is not supported by your browser.' });
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        setPosition(pos);
        setIsLoading(false);
      },
      (err: GeolocationError) => {
        setError(err);
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  return { position, error, isLoading, requestLocation };
};
