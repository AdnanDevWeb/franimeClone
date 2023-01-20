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
import { Link } from 'react-router-dom';


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
        return <SwiperSlide className='sm:grid sm:grid-cols-2 sm:grid-flow-dense pt-8 sm:pl-[70px] w-full gap-10 '>
          <div className='flex flex-col justify-center'>
            <h1 className='hidden sm:block text-center line-clamp-1 text-[1.6rem] sm:text-[2rem] leading-tight sm:line-clamp-2 '>{slide.title}</h1>
            <p className='hidden sm:block max-h-[120px] mt-4 overflow-y-scroll text-lg text-slate-300'>{slide.synopsis}</p>
            <div className='hidden sm:flex gap-2 mt-6'>
              {slide.genres.map(genre => {
                return <p className='hover:bg-slate-800 p-2 bg-secendaryColor w-fit rounded-xl'>{genre.name}</p>
              })}
            </div>
            <Link to={`animes/${slide.mal_id}`} className='mx-auto mb-4 sm:mb-0 mt-4 flex justify-center items-center bg-red-700 rounded-lg w-[266px] h-[50px] text-xl cursor-pointer font-bold'>
              <img className='w-[42px]' src={play} alt="" />
              Regarder
              </Link>
          </div>
          <img className='mb-6 sm:mb-0 mx-auto flex-grow-0 flex-shrink-0 w-auto h-[400px] rounded-[44px] object-cover xs:aspect-square sm:aspect-auto lg:aspect-square xl:aspect-video xs:ml-0 md:ml-5' src={slide.images.webp.large_image_url} alt="" />
        </SwiperSlide>
       })
       : console.log("fetching")
    }
    </Swiper>
  );
};
export default SwiperForAnime