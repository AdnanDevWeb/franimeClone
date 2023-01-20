import { data } from 'autoprefixer'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide, } from 'swiper/react'; 
import 'swiper/css';
import { Link } from 'react-router-dom';

function Action() {
  const url = 'https://api.jikan.moe/v4/anime?genres=1&sort=rank&order_by=rank&min_score=8'
  const [action , setAction] = useState([])
  useEffect(()=>{
    const actionData = async () =>{
      const response = await (
        await fetch(url)
      ).json()
      const animes = response.data
      setAction(animes)
    }
    actionData()
  },[])

  return (
    <section>
      <div className='flex flex-col gap-3'>
        <p className='pl-6 font-bold text-white text-2xl '>🥊 Actions</p>
        <div className='rounded-lg ml-6 max-w-[250px] h-[8px] bg-[#eb1b31]'></div>
      </div>

      <Swiper
      spaceBetween={50}
      slidesPerView={6}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        400:{
          slidesPerView:2,
        },
        639: {
          slidesPerView: 3,
        },
        865:{
          slidesPerView:4
        },
        1000:{
          slidesPerView:5
        },
        1500:{
          slidesPerView:6
        },
        1700:{
          slidesPerView:7
        }
      }}
      >
      <div>
      {
        action?.length > 0
        ? action.map(anime =>{
          return <SwiperSlide className='p-6 '>
          <Link to={`animes/${anime.mal_id}`} className='hover:scale-110 rounded-2xl relative cursor-pointer'>
            <p className='absolute text-white rounded-lg top-3 opacity-90 font-bold  bg-secendaryColor text-center w-14 p-1 h-8 left-3'>#{anime.rank}</p>
            <p className='absolute text-white rounded-lg bottom-3 opacity-90 font-bold  bg-secendaryColor text-center min-w-14 p-1 h-8 left-4'>ep: {anime.episodes}</p>
            <img className=' rounded-2xl min-w-[216px] h-[309px]' src={anime.images.webp.large_image_url} alt="" />
          </Link>
          </SwiperSlide>
        }):null
      }
      </div>
      
      </Swiper>
    </section>
  )
}

export default Action