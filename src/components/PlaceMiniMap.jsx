import {useEffect, useRef, useState} from "react"
import {LoadScript, GoogleMap} from "@react-google-maps/api"
import API_KEY from "../utils/googleAPISetup.js"
import MAP_ID from "../utils/googleMapSetup.js"
import salonIcon from "../assets/map-icons/salons.png"

const libraries = ["marker"]

export default function MiniPlaceMap({lat, lng}) {
  const mapRef = useRef(null)
  const markerRef = useRef(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (!mapLoaded || !window.google?.maps?.marker) return

    const {AdvancedMarkerElement} = window.google.maps.marker

    if (markerRef.current) {
      markerRef.current.map = null
      markerRef.current = null
    }

    const markerDiv = document.createElement("div")
    markerDiv.innerHTML = `
      <svg xmlns='http://www.w3.org/2000/svg' width='40' height='60' viewBox='0 0 60 80'>
        <path d='M30 5C16 5 5 16 5 30c0 18 25 45 25 45s25-27 25-45C55 16 44 5 30 5z' fill='#ff637e'/>
        <image href='${salonIcon}' x='12' y='14' height='36' width='36'/>
      </svg>
    `

    markerRef.current = new AdvancedMarkerElement({
      map: mapRef.current,
      position: {lat, lng},
      content: markerDiv,
    })
  }, [mapLoaded, lat, lng])

  return (
    <LoadScript
      googleMapsApiKey={API_KEY}
      libraries={libraries}
      language="uk"
      region="UA"
    >
      <GoogleMap
        mapContainerStyle={{width: "100%", height: 400, borderRadius: 15}}
        center={{lat, lng}}
        zoom={16}
        options={{
          disableDefaultUI: true,
          mapId: MAP_ID,
          gestureHandling: "greedy",
          clickableIcons: false,
        }}
        onLoad={(map) => {
          mapRef.current = map
          setMapLoaded(true)
        }}
      />
    </LoadScript>
  )
}
