import {categories} from "../utils/constants.js"
import {usePlaces} from "../contexts/PlacesContext.jsx"

export default function Categories() {
  const {placesCategory, setPlacesCategory} = usePlaces()

  return (
    <div className='flex items-center justify-center gap-4 py-8'>
      {categories.map((category) => (
        <div key={category.id}
             onClick={() => setPlacesCategory(category)}
             className={`p-2 flex flex-col items-center justify-center gap-4 rounded-2xl w-14 h-14 md:w-28 md:h-28 
               ${category.style}
               ${placesCategory.id === category.id ? 'border-3' : ''}
             `}>
          <img src={category.icon} alt='category-icon' className='h-8 md:h-10'/>
          <span className='text-xs font-semibold uppercase text-center hidden md:block'>
            {category.name}
          </span>
        </div>
      ))}
    </div>
  )
}