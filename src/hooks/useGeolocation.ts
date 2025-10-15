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
