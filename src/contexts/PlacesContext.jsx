import {createContext, useContext, useState} from "react"
import axios from "axios"
import {useLocation} from "./LocationContext.jsx"
import API_KEY from "../utils/googleAPISetup.js"
import {categories} from "../utils/constants.js"

const PlacesContext = createContext(null)

export function PlacesProvider({children}) {
  const {currentDistrict} = useLocation()

  // const [places, setPlaces] = useState([])
  const [beautySalons, setBeautySalons] = useState([])
  const [hairCare, setHairCare] = useState([])
  const [skinCare, setSkinCare] = useState([])
  const [barbershops, setBarbershops] = useState([])
  const [makeupSalons, setMakeupSalons] = useState([])
  const [nailSalons, setNailSalons] = useState([])
  const [placesCategory, setPlacesCategory] = useState(categories[0])

  const datasets = {
    beauty_salons: beautySalons,
    hair_care: hairCare,
    skin_care: skinCare,
    barbershops: barbershops,
    makeup_salons: makeupSalons,
    nail_salons: nailSalons,
  }

  const currentSet = datasets[placesCategory.key] || []

  const url = 'https://places.googleapis.com/v1/places:searchNearby'
  const location = currentDistrict ?
    {
      latitude: currentDistrict.center.lat,
      longitude: currentDistrict.center.lng,
    }
    :
    { latitude: 50.4501, longitude: 30.5234 }
  const radius = currentDistrict?.radius ?? 20000
  // const limit = 20
  const fields = [
    'places.id',
    'places.displayName',
    'places.businessStatus',
    'places.formattedAddress',
    'places.location',
    'places.rating',
    'places.userRatingCount',
    'places.googleMapsUri',
    'places.websiteUri',
    'places.internationalPhoneNumber',
    'places.types',
    'places.primaryType',
    'places.primaryTypeDisplayName',
    'places.currentOpeningHours',
    'places.photos'
  ].join(',')

  // const getPlaces = async (types, limit) => {
  //   try {
  //     const response = await axios.post(
  //       url,
  //       {
  //         includedPrimaryTypes: types,
  //         locationRestriction: {
  //           circle: {
  //             center: location,
  //             radius,
  //           },
  //         },
  //         languageCode: 'uk',
  //         maxResultCount: limit,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'X-Goog-Api-Key': API_KEY,
  //           'X-Goog-FieldMask': fields,
  //         },
  //       }
  //     )
  //
  //     const results = (response.data.places || [])
  //       .filter((p) => p.businessStatus === 'OPERATIONAL')
  //       .sort((a, b) => (b.rating || 0) - (a.rating || 0))
  //     console.log(results)
  //     setPlaces(results)
  //
  //   } catch (error) {
  //     console.error('API request ERROR:', error.response?.data || error.message)
  //   }
  // }

  const getBeautySalons = async () => {
    try {
      const response = await axios.post(
        url,
        {
          includedPrimaryTypes: categories.find(obj => obj.key === 'beauty_salons').types,
          locationRestriction: {
            circle: {
              center: location,
              radius,
            },
          },
          languageCode: 'uk',
          // maxResultCount: limit,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY,
            'X-Goog-FieldMask': fields,
          },
        }
      )

      const results = (response.data.places || [])
        .filter((p) => p.businessStatus === 'OPERATIONAL')
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      console.log('Beauty salons: ', results)

      setBeautySalons(results)

    } catch (error) {
      console.error('API request Beauty salons error:', error.response?.data || error.message)
    }
  }

  const getHairCare = async () => {
    try {
      const response = await axios.post(
        url,
        {
          includedPrimaryTypes: categories.find(obj => obj.key === 'hair_care').types,
          locationRestriction: {
            circle: {
              center: location,
              radius,
            },
          },
          languageCode: 'uk',
          // maxResultCount: limit,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY,
            'X-Goog-FieldMask': fields,
          },
        }
      )

      const results = (response.data.places || [])
        .filter((p) => p.businessStatus === 'OPERATIONAL')
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      console.log('Hair care: ', results)

      setHairCare(results)

    } catch (error) {
      console.error('API request Hair care error:', error.response?.data || error.message)
    }
  }

  const getSkinCare = async () => {
    try {
      const response = await axios.post(
        url,
        {
          includedPrimaryTypes: categories.find(obj => obj.key === 'skin_care').types,
          locationRestriction: {
            circle: {
              center: location,
              radius,
            },
          },
          languageCode: 'uk',
          // maxResultCount: limit,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY,
            'X-Goog-FieldMask': fields,
          },
        }
      )

      const results = (response.data.places || [])
        .filter((p) => p.businessStatus === 'OPERATIONAL')
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      console.log('Skin care: ', results)

      setSkinCare(results)

    } catch (error) {
      console.error('API request Skin care error:', error.response?.data || error.message)
    }
  }

  const getBarbershops = async () => {
    try {
      const response = await axios.post(
        url,
        {
          includedPrimaryTypes: categories.find(obj => obj.key === 'barbershops').types,
          locationRestriction: {
            circle: {
              center: location,
              radius,
            },
          },
          languageCode: 'uk',
          // maxResultCount: limit,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY,
            'X-Goog-FieldMask': fields,
          },
        }
      )

      const results = (response.data.places || [])
        .filter((p) => p.businessStatus === 'OPERATIONAL')
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      console.log('Skin care: ', results)

      setBarbershops(results)

    } catch (error) {
      console.error('API request Barbershops error:', error.response?.data || error.message)
    }
  }

  const getMakeupSalons = async () => {
    try {
      const response = await axios.post(
        url,
        {
          includedPrimaryTypes: categories.find(obj => obj.key === 'makeup_salons').types,
          locationRestriction: {
            circle: {
              center: location,
              radius,
            },
          },
          languageCode: 'uk',
          // maxResultCount: limit,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY,
            'X-Goog-FieldMask': fields,
          },
        }
      )

      const results = (response.data.places || [])
        .filter((p) => p.businessStatus === 'OPERATIONAL')
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      console.log('Skin care: ', results)

      setMakeupSalons(results)

    } catch (error) {
      console.error('API request Makeup salons error:', error.response?.data || error.message)
    }
  }

  const getNailSalons = async () => {
    try {
      const response = await axios.post(
        url,
        {
          includedPrimaryTypes: categories.find(obj => obj.key === 'nail_salons').types,
          locationRestriction: {
            circle: {
              center: location,
              radius,
            },
          },
          languageCode: 'uk',
          // maxResultCount: limit,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY,
            'X-Goog-FieldMask': fields,
          },
        }
      )

      const results = (response.data.places || [])
        .filter((p) => p.businessStatus === 'OPERATIONAL')
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      console.log('Skin care: ', results)

      setNailSalons(results)

    } catch (error) {
      console.error('API request Nail salons error:', error.response?.data || error.message)
    }
  }

  return (
    <PlacesContext.Provider value={{
      placesCategory, setPlacesCategory,
      currentSet,
      beautySalons, getBeautySalons,
      hairCare, getHairCare,
      skinCare, getSkinCare,
      barbershops, getBarbershops,
      makeupSalons, getMakeupSalons,
      nailSalons, getNailSalons
    }}>
      {children}
    </PlacesContext.Provider>
  )
}

export function usePlaces() {
  return useContext(PlacesContext)
}
