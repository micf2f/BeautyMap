import skinIcon from "../assets/map-icons/skin.png"
import barberIcon from "../assets/map-icons/barber.png"
import hairIcon from "../assets/map-icons/hair.png"
import salonIcon from "../assets/map-icons/salons.png"
import makeupIcon from "../assets/map-icons/makeup.png"
import nailIcon from "../assets/map-icons/nail.png"

const categories = [
  {
    id: 1,
    key: 'beauty_salons',
    name: 'Салони краси',
    types: ['beauty_salon'],
    icon: salonIcon,
    style: 'bg-rose-100 text-rose-400 border-rose-200'
  },
  {
    id: 2,
    key: 'hair_care',
    name: 'Догляд за волоссям',
    types: ['hair_care', 'hair_salon'],
    icon: hairIcon,
    style: 'bg-rose-100 text-rose-400 border-rose-200'
  },
  {
    id: 3,
    key: 'skin_care',
    name: 'Догляд за шкірою',
    types: ['skin_care_clinic', 'beautician'],
    icon: skinIcon,
    style: 'bg-purple-100 text-purple-400 border-purple-200'
  },
  {
    id: 4,
    key: 'barbershops',
    name: 'Барбершопи',
    types: ['barber_shop'],
    icon: barberIcon,
    style: 'bg-blue-100 text-blue-400 border-blue-200'
  },
  {
    id: 5,
    key: 'makeup_salons',
    name: 'Макіяж',
    types: ['makeup_artist'],
    icon: makeupIcon,
    style: 'bg-pink-100 text-pink-400 border-pink-200'
  },
  {
    id: 6,
    key: 'nail_salons',
    name: 'Манікюр та педикюр',
    types: ['nail_salon'],
    icon: nailIcon,
    style: 'bg-pink-100 text-pink-400 border-pink-200'
  },
]

const typeToIcon = {
  skin_care_clinic: skinIcon,
  beautician: skinIcon,
  barber_shop: barberIcon,
  hair_care: hairIcon,
  hair_salon: hairIcon,
  beauty_salon: salonIcon,
  makeup_artist: makeupIcon,
  nail_salon: nailIcon,
}

export {categories, typeToIcon}
