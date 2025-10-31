import {BrowserRouter, Routes, Route} from "react-router-dom"
import {PlacesProvider} from "./contexts/PlacesContext.jsx"
import {PhotosProvider} from "./contexts/PhotosContext.jsx"
import Layout from "./routes/Layout.jsx"
import Main from "./routes/Main.jsx"
import PlacesList from "./routes/PlacesList.jsx"
import PlacesMap from "./routes/PlacesMap.jsx"

function App() {
  return (
    <PlacesProvider>
      <PhotosProvider>
        <BrowserRouter basename="/BeautyMap/">
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Main/>}/>
              <Route path="places/list" element={<PlacesList/>}/>
              <Route path="places/map" element={<PlacesMap/>}/>
              {/*<Route path="*" element={<NotFound />} />*/}
            </Route>
          </Routes>
        </BrowserRouter>
      </PhotosProvider>
    </PlacesProvider>
  )
}

export default App
