import React, { useState } from 'react'
import Nav from './Nav'

import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import Animes from './Animes'
import AnimeShow from './AnimeShow'
function App() {
  return (
    <>
    <Nav />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='animes'>
        <Route index element={<Animes />} />
        <Route path=':id' element={<AnimeShow />} />
      </Route>
    </Routes>
    </>
  )
}

export default App