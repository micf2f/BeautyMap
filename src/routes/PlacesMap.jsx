import {useEffect} from "react"
import {usePlaces} from "../contexts/PlacesContext.jsx"
import Categories from "../components/Categories.jsx"
import MapComponent from "../components/MapComponent.jsx"

export default function PlacesMap() {

  return (
    <div className='h-screen w-full'>
      <MapComponent/>
    </div>
  )
}
