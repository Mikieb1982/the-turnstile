<<<<<<< HEAD
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
=======
import { useCallback, useEffect, useState } from 'react'
import type { Coords } from '../utils/geolocation'

type GeoError = { code: number; message: string } | null

type GeolocationState = {
  position: Coords | null
  error: GeoError
  isLoading: boolean
  requestLocation: () => void
}

const UNSUPPORTED_ERROR: GeoError = {
  code: 0,
  message: 'Geolocation is not supported by this browser.',
}

export default function useGeolocation(): GeolocationState {
  const [position, setPosition] = useState<Coords | null>(null)
  const [error, setError] = useState<GeoError>(null)
  const [isLoading, setIsLoading] = useState(false)

  const requestLocation = useCallback(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setError(UNSUPPORTED_ERROR)
      return
    }

    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lon: pos.coords.longitude })
        setError(null)
        setIsLoading(false)
      },
      (err) => {
        setError({ code: err.code, message: err.message })
        setIsLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }, [])

  useEffect(() => {
    requestLocation()
  }, [requestLocation])

  return { position, error, isLoading, requestLocation }
}
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
