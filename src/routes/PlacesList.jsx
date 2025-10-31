import {useEffect} from "react"
import {usePlaces} from "../contexts/PlacesContext.jsx"
import PlaceItem from "../components/PlaceItem.jsx"
import Categories from "../components/Categories.jsx"

export default function PlacesList() {
  const {currentSet} = usePlaces()

  return (
    <div className='px-4 md:px-16 pb-8'>
      <Categories/>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {currentSet.length
          ? currentSet.map((place) => (
            <div key={place.id}>
              <PlaceItem place={place}/>
            </div>
          ))
          : null}
      </div>
    </div>
  )
}
