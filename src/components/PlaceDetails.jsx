import {GlobeAltIcon, DevicePhoneMobileIcon} from '@heroicons/react/24/outline'

export default function PlaceDetails({place}) {
  return (
    <div className='flex flex-col gap-2 border-t-3 border-rose-200 border-dashed bg-rose-50 rounded-b-xl py-4 h-full'>

      {place?.currentOpeningHours?.weekdayDescriptions ?
        <div className='flex flex-col items-center justify-center mx-4 text-xs'>
          <p className='text-rose-400 font-semibold uppercase'>Графік роботи:</p>
          <ul className="list-disc list-inside marker:text-rose-400 text-gray-600 columns-2 my-2">
            {place.currentOpeningHours.weekdayDescriptions.map((day, index) => (
              <li key={index}>{day}</li>
            ))}
          </ul>
        </div>
      : null}

      {place?.websiteUri ?
        <span className='flex items-center justify-center text-gray-500 text-sm gap-1'>
          <GlobeAltIcon className='h-6 w-6 text-rose-400 '/>
          <a
            href={place.websiteUri}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all truncate hover:text-rose-400 overflow-hidden max-w-[200px]"
          >
            {place?.websiteUri}
          </a>
        </span>
      : null}

      {place?.internationalPhoneNumber ?
        <span className='flex items-center justify-center text-gray-500 text-sm gap-1'>
          <DevicePhoneMobileIcon className='h-6 w-6 text-rose-400 '/>
          {place?.internationalPhoneNumber}
        </span>
      : null}

      <span className='flex items-center justify-center'>
        <a href={place?.googleMapsUri} target="_blank" rel="noopener noreferrer" className='bg-rose-400 hover:bg-rose-800 text-white font-semibold text-xs rounded-full px-4 py-2 mt-2 uppercase'>
          Відкрити на Google Maps
        </a>
      </span>

    </div>
  )
}
