import {useEffect, useRef, useState} from "react"
import {LoadScript, GoogleMap} from "@react-google-maps/api"
import {usePlaces} from "../contexts/PlacesContext.jsx"
import {useLocation} from "../contexts/LocationContext.jsx"
import PlaceItem from "./PlaceItem.jsx"
import Categories from "./Categories.jsx"
import API_KEY from "../utils/googleAPISetup.js"
import MAP_ID from "../utils/googleMapSetup.js"
import {CITIES} from "../utils/cities.js"
import {typeToIcon} from "../utils/constants.js"
import salonIcon from "../assets/map-icons/salons.png"
import {ChevronUpIcon, ChevronDownIcon} from "@heroicons/react/24/outline"

const libraries = ["marker"]

export default function MapComponent() {
  const {city} = useLocation()
  const {currentSet} = usePlaces()

  const cityConfig = CITIES.find(c => c.value === city)

  const [selectedPlace, setSelectedPlace] = useState(null)
  const [showCategories, setShowCategories] = useState(true)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapState, setMapState] = useState(() => ({
    center: cityConfig?.center ?? { lat: 0, lng: 0 },
    zoom: 12,
  }))

  const mapRef = useRef(null)
  const markersRef = useRef([])

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []
  }

  useEffect(() => {
    if (!mapLoaded || !window.google?.maps?.marker || !currentSet?.length) return

    clearMarkers()

    const {AdvancedMarkerElement} = window.google.maps.marker

    currentSet?.forEach((place) => {
      const {latitude, longitude} = place.location || {}
      if (!latitude || !longitude) return

      const iconUrl = typeToIcon[place.primaryType] || salonIcon

      const markerDiv = document.createElement("div")
      markerDiv.innerHTML = `
        <div style="width:60px; height:80px; position:relative; display:flex; align-items:center; justify-content:center; cursor:pointer;">
          <svg xmlns='http://www.w3.org/2000/svg' width='45' height='65' viewBox='0 0 60 80'>
            <path d='M30 5C16 5 5 16 5 30c0 18 25 45 25 45s25-27 25-45C55 16 44 5 30 5z' fill='#ff637e'/>
            <image href='${iconUrl}' x='12' y='14' height='36' width='36'/>
          </svg>
        </div>
      `

      const marker = new AdvancedMarkerElement({
        map: mapRef.current,
        position: {lat: latitude, lng: longitude},
        content: markerDiv,
      })

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
        <div style="font-family:sans-serif; max-width:200px">
          <div style="font-weight:700">${place.displayName?.text || "Без назви"}</div><br/>
          ${place.rating ? `⭐ ${place.rating}` : ""}<br/>
          ${place.formattedAddress || ""}
        </div>
      `,
      })

      markerDiv.addEventListener("mouseenter", () => {
        infoWindow.open({
          anchor: marker,
          map: mapRef.current,
          shouldFocus: false,
        })
      })

      markerDiv.addEventListener("mouseleave", () => {
        infoWindow.close()
      })

      markerDiv.addEventListener("click", () => setSelectedPlace(place))

      markersRef.current.push(marker)
    })
  }, [currentSet, mapLoaded])

  const handleMapIdle = () => {
    if (!mapRef.current) return

    const center = mapRef.current.getCenter()
    const zoom = mapRef.current.getZoom()

    setMapState({
      center: { lat: center.lat(), lng: center.lng() },
      zoom,
    })
  }

  const handleMapLoad = (mapInstance) => {
    mapRef.current = mapInstance
    setMapLoaded(true)
  }

  return (
    <LoadScript googleMapsApiKey={API_KEY} language="uk" region="UA" libraries={libraries}>
      <div className="relative w-full h-screen">
        <GoogleMap
          mapContainerStyle={{width: "100%", height: "100%"}}
          center={mapState.center}
          zoom={mapState.zoom}
          options={{
            disableDefaultUI: true,
            mapId: MAP_ID,
            gestureHandling: 'greedy'
          }}
          onLoad={handleMapLoad}
          onIdle={handleMapIdle}
        />

        <div className="absolute top-4 left-0 right-0 z-[49] flex flex-col justify-center items-center px-4">
          <button onClick={() => setShowCategories(!showCategories)}
                  className='w-60 flex justify-center items-center gap-2 bg-rose-400 hover:bg-rose-800 text-white font-semibold text-xs rounded-full px-4 py-2 uppercase transition-colors'
          >
            {showCategories ? 'Приховати категорії' : 'Показати категорії'}
            {showCategories ? <ChevronUpIcon className='w-4 h-4' /> : <ChevronDownIcon className='w-4 h-4' />}
          </button>
          {showCategories && (
            <div className="w-full cursor-pointer">
              <Categories />
            </div>
          )}
        </div>

        {selectedPlace &&
          <div className="
            absolute z-50
            top-2 bottom-2 left-1/2 -translate-x-1/2
            md:top-4 md:bottom-4 md:right-4 md:left-auto md:-translate-x-0
            w-full max-w-sm
            h-[calc(100vh-1rem)] md:h-[calc(100vh-2rem)]
            rounded-xl
            flex flex-col
          ">
            <div className="flex-1 overflow-y-auto rounded-xl border-3 border-gray-300 border-dashed bg-white">
              <PlaceItem place={selectedPlace} enableClose={true} setSelectedPlace={setSelectedPlace} enableModal={false} />
            </div>
          </div>
        }
      </div>
    </LoadScript>
  )
}
