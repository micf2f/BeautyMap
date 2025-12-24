import {useEffect} from "react"
import {usePlaceDetails} from "../contexts/PlaceDetailsContext.jsx"
import PlacePhotos from "./PlacePhotos.jsx"
import PlaceMiniMap from "./PlaceMiniMap.jsx"
import {DevicePhoneMobileIcon, GlobeAltIcon, XMarkIcon, CheckCircleIcon} from "@heroicons/react/24/outline/index.js"
import {StarIcon} from "@heroicons/react/24/solid/index.js"

export default function PlaceItemModal({place, isOpen, onClose}) {
  const {getPlaceDetails, details} = usePlaceDetails()

  useEffect(() => {
    if (place.id) {
      getPlaceDetails(place.id)
    }
  },[place])

  useEffect(() => {
    console.log('details:', details)
  },[details])

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-[95vw] md:w-[60vw] max-h-[95vh] bg-white rounded-2xl shadow-xl overflow-y-auto p-6">

        <div className='flex justify-end'>
          <XMarkIcon className="h-6 w-6 text-gray-400 cursor-pointer" onClick={onClose} />
        </div>

        <PlacePhotos place={place} size={'w-full h-[450px]'} />

        <div className='mx-4'>
          <div className='flex flex-col md:flex-row md:justify-between items-center gap-2 md:gap-4'>
            <p className='font-bold text-gray-500 text-center md:text-start text-lg'>
              {place?.displayName?.text}
            </p>
            <p className='text-md text-gray-500 my-4 text-center md:text-end italic'>
              {place?.formattedAddress}
            </p>
          </div>
          <div className='flex items-center justify-center md:justify-start'>
            <span className='text-[10px] font-bold text-rose-400 bg-rose-100 rounded-xl py-1 px-3 uppercase'>
              {place?.primaryTypeDisplayName?.text}
            </span>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 m-4'>

          <div>

            {details?.editorialSummary?.text || details?.reviewSummary?.text?.text ?
              <div className='mb-2'>
                <p className='text-gray-600 text-sm font-semibold uppercase'>
                  Про салон
                </p>
                <p className='text-xs text-gray-600 my-2'>
                  {details?.editorialSummary?.text || details?.reviewSummary?.text?.text}
                </p>
              </div>
            : null}

            {details?.priceRange?.startPrice && details?.priceRange?.endPrice ?
              <div className='mb-2'>
                <p className='text-gray-600 text-sm font-semibold uppercase'>
                  Ціни
                </p>
                <p className='text-xs text-gray-600 my-2'>
                  {details?.priceRange?.startPrice?.units} {details?.priceRange?.startPrice?.currencyCode} – {details?.priceRange?.endPrice?.units} {details?.priceRange?.endPrice?.currencyCode}
                </p>
              </div>
            : null}

            {place?.currentOpeningHours?.weekdayDescriptions ?
              <div className='bg-rose-50 rounded-2xl flex flex-col items-start justify-center p-4'>
                <p className='text-rose-500 font-semibold uppercase text-sm'>
                  Графік роботи
                </p>
                <ul className="list-disc list-inside marker:text-rose-400 text-gray-600 columns-2 my-2 text-sm">
                  {place.currentOpeningHours.weekdayDescriptions.map((day, index) => (
                    <li key={index}>{day}</li>
                  ))}
                </ul>
              </div>
            : null}

            {place?.websiteUri || place?.internationalPhoneNumber ?
              <div className='p-4 my-2'>

                <p className='text-gray-600 font-semibold uppercase text-sm'>
                  Контакти
                </p>

                {place?.websiteUri ?
                  <span className='flex items-center justify-start text-gray-500 text-sm gap-1 my-2'>
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
                  <span className='flex items-center justify-start text-gray-500 text-sm gap-1 my-2'>
                    <DevicePhoneMobileIcon className='h-6 w-6 text-rose-400 '/>
                    {place?.internationalPhoneNumber}
                  </span>
                : null}

              </div>
            : null}

            {details?.paymentOptions ?
              <div className='bg-gray-100 rounded-2xl p-4 my-4'>
                <p className='text-gray-600 font-semibold uppercase text-sm mb-2'>
                  Оплата
                </p>
                {details?.paymentOptions?.acceptsCashOnly && (
                  <span className='flex items-center justify-between text-gray-500 text-sm gap-1 mb-1'>
                    <p className='text-sm text-gray-600'>
                      Тільки готівка
                    </p>
                    <CheckCircleIcon className="h-5 w-5 text-rose-400" />
                  </span>
                )}
                {details?.paymentOptions?.acceptsCreditCards && (
                  <span className='flex items-center justify-between text-gray-500 text-sm gap-1 mb-1'>
                    <p className='text-sm text-gray-600'>
                      Кредитні картки
                    </p>
                    <CheckCircleIcon className="h-5 w-5 text-rose-400" />
                  </span>
                )}
                {details?.paymentOptions?.acceptsDebitCards && (
                  <span className='flex items-center justify-between text-gray-500 text-sm gap-1 mb-1'>
                    <p className='text-sm text-gray-600'>
                      Дебетові картки
                    </p>
                    <CheckCircleIcon className="h-5 w-5 text-rose-400" />
                  </span>
                )}
                {details?.paymentOptions?.acceptsNfc && (
                  <span className='flex items-center justify-between text-gray-500 text-sm gap-1 mb-1'>
                    <p className='text-sm text-gray-600'>
                      NFC / безконтактна оплата
                    </p>
                    <CheckCircleIcon className="h-5 w-5 text-rose-400" />
                  </span>
                )}
              </div>
            : null}

            {details?.parkingOptions ?
              <div className='bg-gray-100 rounded-2xl p-4'>
                <p className='text-gray-600 font-semibold uppercase text-sm mb-2'>
                  Паркінг
                </p>
                {details?.parkingOptions?.freeParkingLot && (
                  <span className='flex items-center justify-between text-gray-500 text-sm gap-1 mb-1'>
                    <p className='text-sm text-gray-600'>
                      Безкоштовна парковка на території
                    </p>
                    <CheckCircleIcon className="h-5 w-5 text-rose-400" />
                  </span>
                )}
                {details?.parkingOptions?.paidParkingLot && (
                  <span className='flex items-center justify-between text-gray-500 text-sm gap-1 mb-1'>
                    <p className='text-sm text-gray-600'>
                      Платна парковка на території
                    </p>
                    <CheckCircleIcon className="h-5 w-5 text-rose-400" />
                  </span>
                )}
                {details?.parkingOptions?.freeStreetParking && (
                  <span className='flex items-center justify-between text-gray-500 text-sm gap-1 mb-1'>
                    <p className='text-sm text-gray-600'>
                      Безкоштовна вулична парковка
                    </p>
                    <CheckCircleIcon className="h-5 w-5 text-rose-400" />
                  </span>
                )}
                {details?.parkingOptions?.paidStreetParking && (
                  <span className='flex items-center justify-between text-gray-500 text-sm gap-1 mb-1'>
                    <p className='text-sm text-gray-600'>
                      Платна вулична парковка
                    </p>
                    <CheckCircleIcon className="h-5 w-5 text-rose-400" />
                  </span>
                )}
                {details?.parkingOptions?.valetParking && (
                  <span className='flex items-center justify-between text-gray-500 text-sm gap-1 mb-1'>
                    <p className='text-sm text-gray-600'>
                      Парковка з валетом
                    </p>
                    <CheckCircleIcon className="h-5 w-5 text-rose-400" />
                  </span>
                )}
                {details?.parkingOptions?.freeGarageParking && (
                  <span className='flex items-center justify-between text-gray-500 text-sm gap-1 mb-1'>
                    <p className='text-sm text-gray-600'>
                      Безкоштовний паркінг у гаражі / підземний
                    </p>
                    <CheckCircleIcon className="h-5 w-5 text-rose-400" />
                  </span>
                )}
                {details?.parkingOptions?.paidGarageParking && (
                  <span className='flex items-center justify-between text-gray-500 text-sm gap-1 mb-1'>
                    <p className='text-sm text-gray-600'>
                      Платний гаражний / підземний паркінг
                    </p>
                    <CheckCircleIcon className="h-5 w-5 text-rose-400" />
                  </span>
                )}
              </div>
            : null}

          </div>

          {details && details?.reviews?.length ?
            <div className='bg-gray-100 rounded-2xl p-4'>
              <span className="flex items-center gap-1 text-gray-500 text-sm font-semibold">
                {place?.rating ? place.rating : ''}
                <StarIcon className="h-5 w-5 text-yellow-500"/>
                ({place?.userRatingCount ? place.userRatingCount : '0'} відгуків)
              </span>
                {details?.reviews.map(review => (
                  <div key={review.name} className='bg-white rounded-xl shadow-sm px-4 py-2 my-2'>
                    <p className='font-semibold text-xs text-gray-700'>
                      {review?.authorAttribution?.displayName}
                    </p>
                    <p className='text-xs text-gray-600 my-2'>
                      {review?.text?.text}
                    </p>
                    <div className='flex items-center justify-between'>
                      <p className='font-semibold text-xs text-gray-500'>
                        {new Date(review?.publishTime).toLocaleString('uk-UA')}
                      </p>
                      <span className="flex items-center gap-1 text-gray-500 text-sm font-semibold">
                        <StarIcon className="h-5 w-5 text-yellow-500"/>
                        {review?.rating}
                      </span>
                    </div>
                  </div>
                ))
              }
            </div>
          : null}

        </div>

        <div className='m-4'>
          <PlaceMiniMap lat={place.location.latitude} lng={place.location.longitude} />
        </div>

        <span className='flex items-center justify-center'>
        <a href={place?.googleMapsUri} target="_blank" rel="noopener noreferrer" className='bg-rose-400 hover:bg-rose-800 text-white font-semibold text-xs rounded-full px-4 py-2 mt-2 uppercase'>
          Відкрити на Google Maps
        </a>
      </span>

      </div>
    </div>
  )
}