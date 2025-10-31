import {NavLink} from "react-router-dom"
import PlacePhotos from "./PlacePhotos.jsx"
import {StarIcon} from "@heroicons/react/24/solid/index.js"
import {ArrowRightIcon} from "@heroicons/react/24/outline/index.js"

export default function PopularItem({place}) {
  return (
    <div className='border-3 border-gray-300 border-dashed rounded-xl flex flex-col h-full pb-6 justify-between bg-white'>

      <PlacePhotos place={place} size={'w-full h-[200px]'}/>

      <div className='flex justify-between mx-8'>
        <p className='font-bold text-gray-500 mb-2'>
          {place.displayName.text}
        </p>
        <span className="flex items-center gap-1 text-gray-500 text-sm font-semibold">
          <StarIcon className="h-6 w-6 text-yellow-500"/>
          {place.rating ? place.rating : '–'}
        </span>
      </div>

      <div className='flex flex-col md:flex-row md:justify-between items-center mx-8'>
        <span className='text-[10px] font-bold text-rose-400 bg-rose-100 rounded-xl py-1 px-3 my-2 md:my-0 uppercase'>
          {place.primaryTypeDisplayName.text}
        </span>
        <NavLink to='/places/list' className='text-sm font-semibold text-rose-400 hover:text-rose-800'>
          <ArrowRightIcon className="h-6 w-6"/>
        </NavLink>
      </div>

    </div>
  )
}