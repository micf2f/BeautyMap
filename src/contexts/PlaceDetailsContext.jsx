import {createContext, useContext, useEffect, useState} from "react"
import axios from "axios"
import API_KEY from "../utils/googleAPISetup.js"

const PlaceDetailsContext = createContext(null)

export function PlaceDetailsProvider({children}) {
  const [details, setDetails] = useState({})

  const fields = [
    'editorialSummary',
    'reviewSummary',
    'reviews',
    'priceRange',
    'parkingOptions',
    'paymentOptions',
    // 'accessibilityOptions'
  ].join(',')

  const getPlaceDetails = async (placeId) => {
    try {
      const response = await axios.get(
        `https://places.googleapis.com/v1/places/${placeId}`,
        {
          params: {
            languageCode: 'uk',
          },
          headers: {
            "X-Goog-Api-Key": API_KEY,
            "X-Goog-FieldMask": fields,
          },
        }
      )

      const result = response.data
      setDetails(result)

    } catch (err) {
      console.error('Error during getting place details:', err)
    }
  }

  return (
    <PlaceDetailsContext.Provider value={{
      getPlaceDetails, details
    }}>
      {children}
    </PlaceDetailsContext.Provider>
  )
}

export function usePlaceDetails() {
  return useContext(PlaceDetailsContext)
}
