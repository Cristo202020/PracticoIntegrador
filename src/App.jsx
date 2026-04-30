import {Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './pages/home'
import List from './pages/list'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/List" element={<List />} />
      </Routes>
    </>
  );
}

export default App
