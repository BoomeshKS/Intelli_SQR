import React from 'react'
import Home from './home/Home'
import Details from './Details/Details'
import { Routes, Route } from 'react-router-dom';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Details' element={<Details />} />
    </Routes>
  )
}

export default AllRoutes