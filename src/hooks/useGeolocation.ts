import { useEffect, useState } from "react"
import type { Coords } from "../utils/geolocation"

export default function useGeolocation() {
  const [coords, setCoords] = useState<Coords | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) return
    const id = navigator.geolocation.watchPosition(
      p => setCoords({ lat: p.coords.latitude, lon: p.coords.longitude }),
      () => setCoords(null)
    )
    return () => navigator.geolocation.clearWatch(id)
  }, [])

  return coords
}
