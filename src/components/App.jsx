import React, { useState } from 'react'
import Nav from './Nav'

import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import Animes from './Animes'
function App() {
  return (
    <>
    <Nav />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/animes' element={<Animes />} />
    </Routes>
    </>
  )
}

export default App