import {useState} from "react"
import PlaceDetails from "./PlaceDetails.jsx"
import PlacePhotos from "./PlacePhotos.jsx"
import {StarIcon} from '@heroicons/react/24/solid'
import {ChevronDownIcon, ChevronUpIcon, XMarkIcon} from '@heroicons/react/24/outline'

export default function PlaceItem({place, enableClose = false, setSelectedPlace}) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className={`rounded-xl flex flex-col h-full justify-between bg-white ${enableClose ? '' : 'border-3 border-gray-300 border-dashed'}`}>

      {enableClose && <div className='flex justify-end pt-2 pr-2'>
        <XMarkIcon className="h-6 w-6 text-gray-400 cursor-pointer" onClick={() => setSelectedPlace(null)}/>
      </div>}

      <PlacePhotos place={place} size={'w-full h-[300px]'}/>

      <div>
        <div className='flex flex-col items-center justify-center mx-4 mt-2'>
          <p className='font-bold text-gray-500 text-center mb-2'>
            {place?.displayName?.text}
          </p>
          <span className='text-[10px] font-bold text-rose-400 bg-rose-100 rounded-xl py-1 px-3 uppercase'>
            {place?.primaryTypeDisplayName?.text}
          </span>
          <p className='text-sm text-gray-500 my-4 text-center'>
            {place?.formattedAddress}
          </p>
        </div>

        <div className="flex items-center justify-between mx-4 mb-4">
          <span className="flex items-center gap-1 text-gray-500 text-sm font-semibold">
            <StarIcon className="h-6 w-6 text-yellow-500"/>
            {place?.rating ? place.rating : '–'} ({place?.userRatingCount ? place.userRatingCount : '0'} відгуків)
          </span>
          <span
            className={`text-[10px] font-bold rounded-xl py-1 px-3 uppercase ${
              place?.currentOpeningHours?.openNow ? "bg-green-100 text-green-400" : "bg-pink-100 text-pink-400"
            }`}
          >
            {place?.currentOpeningHours?.openNow ? "Відчинено" : "Зачинено"}
          </span>
        </div>
      </div>

      <button
        className='flex items-center justify-center text-gray-500 text-sm mt-auto mb-4 gap-1'
        onClick={() => setShowDetails(!showDetails)}
      >
        Більше інформації
        {showDetails ? <ChevronUpIcon className='h-6 w-6 text-gray-400'/> :
          <ChevronDownIcon className='h-6 w-6 text-gray-400'/>}
      </button>

      {showDetails && (<PlaceDetails place={place}/>)}

    </div>
  )
}
