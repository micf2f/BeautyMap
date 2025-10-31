import {NavLink} from "react-router-dom"
import LocationSelect from "../components/LocationSelect.jsx"
import Categories from "../components/Categories.jsx"
import Info from "../components/Info.jsx"
import PopularPlaces from "../components/PopularPlaces.jsx"
import promoImg from '../assets/main-page-img.png'

export default function Main() {

  return (
    <div className='pb-8'>
      <div className="bg-rose-100 max-w-screen flex flex-col-reverse md:flex-row items-center md:items-center justify-between px-6 md:px-16 py-10 md:py-0 text-center md:text-left">

        <div className="flex flex-col items-center md:items-start gap-3 mt-6 md:mt-0">
          <h1 className="text-3xl font-bold text-gray-600 mb-4">
            Знайди салон краси поруч
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <LocationSelect/>
            <NavLink
              to={"/places/map"}
              className="bg-rose-400 hover:bg-rose-800 text-white font-semibold text-xs rounded-full px-6 py-2.5 uppercase transition-colors duration-200"
            >
              Дивитись мапу
            </NavLink>
          </div>
        </div>

        <img
          src={promoImg}
          alt="promo"
          className="w-70 object-contain mr-0 md:mr-24"
        />

      </div>

      <Categories/>
      <PopularPlaces/>
      <Info/>

    </div>
  )
}
