import {createContext, useContext} from "react"
import API_KEY from "../utils/googleAPISetup.js"
import DEFAULT_PHOTO from "../assets/no_image.jpg"

const PhotosContext = createContext(null)

export function PhotosProvider({children}) {

  const getPhotos = async (place, setPhotos) => {
    if (!place?.photos?.length) {
      setPhotos([DEFAULT_PHOTO])
      return
    }

    const urls = place.photos.map(
      (photo) => `https://places.googleapis.com/v1/${photo.name}/media?key=${API_KEY}&maxHeightPx=800`
    )
    setPhotos(urls)
  }

  return (
    <PhotosContext.Provider value={{getPhotos}}>
      {children}
    </PhotosContext.Provider>
  )
}

export function usePhotos() {
  return useContext(PhotosContext)
}