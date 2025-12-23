import {useEffect} from "react"
import {Outlet} from "react-router-dom"
import {usePlaces} from "../contexts/PlacesContext.jsx"
import {useLocation} from "../contexts/LocationContext.jsx"
import Header from "../components/Header.jsx"

export default function Layout() {
  const {
    placesCategory,
    getBeautySalons,
    getHairCare,
    getSkinCare,
    getBarbershops,
    getMakeupSalons,
    getNailSalons
  } = usePlaces()

  const {districtKey} = useLocation()

  useEffect(() => {
    if (placesCategory.key === 'beauty_salons') {
      getBeautySalons()
    }

    if (placesCategory.key === 'hair_care') {
      getHairCare()
    }

    if (placesCategory.key === 'skin_care') {
      getSkinCare()
    }

    if (placesCategory.key === 'barbershops') {
      getBarbershops()
    }

    if (placesCategory.key === 'makeup_salons') {
      getMakeupSalons()
    }

    if (placesCategory.key === 'nail_salons') {
      getNailSalons()
    }

  }, [placesCategory, districtKey])

  return (
    <div className='font-montserrat'>
      <div className='bg-white border-b-1 border-gray-300 shadow-gray-500 px-8 py-4'>
        <Header/>
      </div>
      <div className='bg-gray-100 min-h-screen'>
        <Outlet/>
      </div>
    </div>
  )
}