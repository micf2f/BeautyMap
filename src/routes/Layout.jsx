import {useEffect} from "react"
import {Outlet} from "react-router-dom"
import {usePlaces} from "../contexts/PlacesContext.jsx"
import Header from "../components/Header.jsx"

export default function Layout() {
  const {
    placesCategory,
    beautySalons, getBeautySalons,
    hairCare, getHairCare,
    skinCare, getSkinCare,
    barbershops, getBarbershops,
    makeupSalons, getMakeupSalons,
    nailSalons, getNailSalons
  } = usePlaces()

  useEffect(() => {
    if (placesCategory.key === 'beauty_salons' && beautySalons.length === 0) {
      getBeautySalons()
    }
  }, [placesCategory])

  useEffect(() => {
    if (placesCategory.key === 'hair_care' && hairCare.length === 0) {
      getHairCare()
    }
  }, [placesCategory])

  useEffect(() => {
    if (placesCategory.key === 'skin_care' && skinCare.length === 0) {
      getSkinCare()
    }
  }, [placesCategory])

  useEffect(() => {
    if (placesCategory.key === 'barbershops' && barbershops.length === 0) {
      getBarbershops()
    }
  }, [placesCategory])

  useEffect(() => {
    if (placesCategory.key === 'makeup_salons' && makeupSalons.length === 0) {
      getMakeupSalons()
    }
  }, [placesCategory])

  useEffect(() => {
    if (placesCategory.key === 'nail_salons' && nailSalons.length === 0) {
      getNailSalons()
    }
  }, [placesCategory])

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