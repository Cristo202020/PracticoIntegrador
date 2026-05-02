import {Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './pages/home'
import List from './pages/list'
import Favorites from './pages/favorites'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/List" element={<List />} />
        <Route path="/Favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App
