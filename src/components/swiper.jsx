// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { useEffect, useState } from 'react';
import { data } from 'autoprefixer';
import play from './play.svg'

import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'


function SwiperForAnime(){
  const urlSeasonNow = "https://api.jikan.moe/v4/seasons/now?limit=6"

  const [swiperAnime , setSwiperAnime] = useState([])
  useEffect(()=>{
    const fetchSwiper = async ()=>{
      const response = await (
        await fetch(urlSeasonNow)
      ).json();
      const animes = response.data
      setSwiperAnime(animes)
    };

    fetchSwiper();
  },[])
  return (
    <Swiper
      spaceBetween={50}
      modules = {[Navigation ,Pagination, Autoplay]}
      autoplay = {{delay:3000,disableOnInteraction: false}}
      navigation
      pagination =  {{clickable: true}}
      slidesPerView={1}
      className="text-white"
    >
    {
      swiperAnime?.length > 0
       ? swiperAnime.map(slide =>{
        return <SwiperSlide className='grid grid-cols-2 pt-8 pl-[70px] w-full gap-8 '>
          <div className='hidden sm:block'>
            <h1 className='text-[2rem] leading-tight line-clamp-2 '>{slide.title}</h1>
            <p className='max-h-[120px] mt-4 overflow-y-scroll text-lg text-slate-300'>{slide.synopsis}</p>
            <div className='flex gap-2 mt-6'>
              {slide.genres.map(genre => {
                return <p className='hover:bg-slate-800 p-2 bg-secendaryColor w-fit rounded-xl'>{genre.name}</p>
              })}
            </div>
            <button className=' mt-4 flex justify-center items-center bg-red-700 rounded-lg w-[266px] h-[50px] text-xl cursor-pointer font-bold'>
              <img className='w-[42px]' src={play} alt="" />
              Regarder
              </button>
          </div>
          <div className='flex justify-center'>
            <img className='rounded-2xl w-[260px] h-[350px]' src={slide.images.webp.large_image_url} alt="" />
          </div>
        </SwiperSlide>
       })
       : console.log("fetching")
    }
    </Swiper>
  );
};

export default SwiperForAnime