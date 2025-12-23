import {createContext, useContext, useEffect, useState} from "react"
import {KYIV_DISTRICTS} from "../utils/cities.js"

const LocationContext = createContext(null)

export function LocationProvider({children}) {
  const [city, setCity] = useState("kyiv")
  const [districtKey, setDistrictKey] = useState("all")

  const districts = city === "kyiv" ? KYIV_DISTRICTS : null
  const currentDistrict = districts[districtKey]

  return (
    <LocationContext.Provider value={{
        city, setCity,
        districts, districtKey, setDistrictKey, currentDistrict
    }}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  return useContext(LocationContext)
}