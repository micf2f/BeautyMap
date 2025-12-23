import {NavLink, useLocation} from "react-router-dom"
import LocationSelect from "./LocationSelect.jsx"
import DistrictSelect from "./DistrictSelect.jsx"
import logo from '../assets/logo-light.png'
import logoMini from '../assets/logo-mini.png'
import {MapPinIcon, ListBulletIcon} from "@heroicons/react/24/outline"

export default function Header() {
  const location = useLocation()

  return (
    <div className='flex items-center justify-between'>

      <NavLink to='/'>
        <img src={logo} alt='logo' className='h-[60px] hidden md:block'/>
        <img src={logoMini} alt='logo-mini' className='h-[60px] block md:hidden'/>
      </NavLink>

      <div className='flex items-center justify-center gap-4 p-2'>
        <div className='flex flex-col md:flex-row items-end gap-2'>
          <LocationSelect/>
          <DistrictSelect/>
        </div>
        <NavLink
          to={location.pathname === '/places/list' ? '/places/map' : '/places/list'}
          className='bg-rose-400 hover:bg-rose-800 text-white font-semibold text-xs rounded-full px-4 py-2 uppercase transition-colors'
        >
          <span className='flex items-center justify-center gap-2'>
            {location.pathname === '/places/list'
              ? <MapPinIcon className='w-5 h-5 text-white'/>
              : <ListBulletIcon className='w-5 h-5 text-white'/>
            }
            <p className='hidden md:inline-block'>
              Показати {location.pathname === '/places/list' ? 'на мапі' : 'список'}
            </p>
          </span>
        </NavLink>
      </div>

    </div>
  )
}