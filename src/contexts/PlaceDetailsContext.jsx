import {createContext, useContext, useEffect, useState} from "react"
import axios from "axios"
import API_KEY from "../utils/googleAPISetup.js"

const PlaceDetailsContext = createContext(null)

export function PlaceDetailsProvider({children}) {
  const [details, setDetails] = useState({})

  const fields = [
    'editorialSummary',
    'reviews',
    'priceLevel',
    'parkingOptions',
    'paymentOptions',
    'accessibilityOptions',
    'restroom',
    'outdoorSeating',
    'servesBeer',
    'servesWine',
    'servesCocktails',
    'goodForGroups',
    'allowsDogs'
  ].join(',')

  const getPlaceDetails = async (placeId) => {
    try {
      const response = await axios.get(
        `https://places.googleapis.com/v1/places/${placeId}`,
        {
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

  useEffect(() => {
    // getPlaceDetails('ChIJq15u-LjP1EAR2k6gWj6z_Kk')
  },[])

  useEffect(() => {
    console.log('details:', details)
  },[details])

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
