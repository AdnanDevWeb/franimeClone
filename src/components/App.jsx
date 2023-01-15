import React, { useState } from 'react'
import Nav from './Nav'
import SwiperForAnime from './swiper'
import UpComing from './upComing'
import TopAllTime from './topAllTime'
import Romance  from './Romance'
import Action from './Action'
function App() {
  return (
    <>
    <Nav />
    <SwiperForAnime />
    <UpComing />
    <TopAllTime />
    <Romance />
    <Action />
    </>
  )
}

export default App