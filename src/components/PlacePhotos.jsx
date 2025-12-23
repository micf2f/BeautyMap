import {useEffect, useState, useRef, memo} from "react"
import {usePhotos} from "../contexts/PhotosContext.jsx"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const photoCache = {}

function PlacePhotos({place, size}) {
  const {getPhotos} = usePhotos()
  const [photos, setPhotos] = useState([])
  const sliderRef = useRef(null)

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
  }

  const handleImageError = (index) => {
    setPhotos(prev => {
      const next = prev.filter((_, i) => i !== index)
      photoCache[place.id] = next

      return next.length ? next : []
    })
  }

  useEffect(() => {
    if (!place) return

    if (photoCache[place.id]) {
      setPhotos(photoCache[place.id])
      setTimeout(() => {
        sliderRef.current?.slickGoTo(0)
      }, 100)
    } else {
      getPhotos(place, (fetchedPhotos) => {
        photoCache[place.id] = fetchedPhotos
        setPhotos(fetchedPhotos)
        setTimeout(() => {
          sliderRef.current?.slickGoTo(0)
        }, 100)
      })
    }
  }, [place])

  return (
    <div className="mx-8 mb-2 mt-6">
      <Slider {...settings} ref={sliderRef} key={place?.id}>
        {photos.map((photo, index) => (
          <div key={index} className="flex justify-center">
            <img
              src={photo}
              alt="place image"
              className={`rounded-2xl object-cover ${size}`}
              onError={() => handleImageError(index)}
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default memo(PlacePhotos)
