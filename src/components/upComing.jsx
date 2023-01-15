import { data } from 'autoprefixer'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide} from 'swiper/react'; 
import 'swiper/css';


function UpComing() {
  const url = 'https://api.jikan.moe/v4/seasons/upcoming'
  const [upComing , setUpcoming] = useState([])
  useEffect(()=>{
    const upComingData = async () =>{
      const response = await (
        await fetch(url)
      ).json()
      const animes = response.data
      setUpcoming(animes)
    }
    upComingData()
  },[])
  return (
    <section>
      <div className='flex flex-col gap-3'>
        <p className='pl-6 font-bold text-white text-2xl '>Arrive Bientôt !</p>
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
        upComing?.length > 0
        ? upComing.map(anime =>{
          return <SwiperSlide className='p-6 '>
          
          <div className='hover:scale-110 rounded-2xl relative cursor-pointer'>
            {anime.themes?.length > 0
              ? <p className='absolute bg-secendaryColor opacity-90 bottom-2 left-2 pl-2 pr-2 pt-1 pb-1 min-w-[70px] text-center font-bold rounded-lg text-white'>{anime.themes?.length > 0 ? anime.themes[0].name : null}</p>
              : null
            }
            <img className=' rounded-2xl min-w-[216px] h-[309px]' src={anime.images.webp.large_image_url} alt="" />
          </div>
          </SwiperSlide>
        }):null
      }
      </div>
      
      </Swiper>
    </section>
  )
}

export default UpComing