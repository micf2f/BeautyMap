import {usePlaces} from "../contexts/PlacesContext.jsx"
import PopularItem from "./PopularItem.jsx"

export default function PopularPlaces() {
  const {currentSet} = usePlaces()

  return (
    <div className='px-6 md:px-16 py-2 md:py-8'>
      <h2 className="text-xl font-bold text-gray-500 mb-4">
        Популярні салони в цій категорії
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {currentSet.length
          ? currentSet.slice(0, 3).map((place) => (
            <div key={place.id}>
              <PopularItem place={place} />
            </div>
          ))
          : null}
      </div>
    </div>
  )
}