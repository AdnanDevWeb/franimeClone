import React, { useEffect, useRef } from 'react'
import searchIcon from './searchIcon.svg'
import { useState } from 'react'

function Animes() {
    const [animes, setAnimes] = useState([])
    const [baseAnimes, setBaseAnime] = useState([])
    const searchInput = useRef(null)
    const getAnime = async () =>{
        const response = await fetch('https://api.jikan.moe/v4/seasons/now')
        const jsonResponse = await response.json();
        setBaseAnime(jsonResponse.data)
        setAnimes(jsonResponse.data)
    }
    useEffect(()=>{
        getAnime()
    },[])
    const makeRequest = async () =>{
        const response = await fetch(`https://api.jikan.moe/v4/anime?letter=${searchInput.current.value}`)
        const jsonResponse = await response.json();
        setAnimes(jsonResponse.data)
    }
   return (
    <section>
        <h1 className='text-white text-[2.5rem] font-bold text-center mt-10'>Recherche ton animé</h1>
        <div className='flex gap-2 justify-center mt-5 relative'>
            <div className='relative w-fit'>
            <input ref={searchInput}  onChange={(e) => makeRequest()} className='rounded-lg p-2 pl-8 focus:outline-none placeholder-white text-white bg-secendaryColor' type="text" name="search" placeholder='Rechercher un anime,film...' id="" />
            <img className='w-6 absolute left-1 top-2' src={searchIcon} alt="" />
            </div>
        </div>
        <div className='mt-10 grid grid-cols-[repeat(auto-fit,_190px)] justify-center gap-6'>
            {
                animes?.length > 0 
                ? animes.map(anime =>{
                    return (
                        <div className='cursor-pointer h-full relative hover:scale-105 hover:opacity-50 transition-all'>
                            <img src={anime.images.webp.image_url} className='h-full rounded-xl obkect-cover' alt="" />
                            <p className='absolute bottom-3 left-3 text-white bg-secendaryColor rounded-md p-2 opacity-90'>{anime.score}</p>
                            <p className='absolute bottom-1 right-3 text-white bg-secendaryColor rounded-md p-2 opacity-90'>eps: {anime.episodes}</p>
                        </div>
                    )
                })
                : baseAnimes.map(baseAnime =>{
                    return (
                        <div className='cursor-pointer relative hover:scale-105 hover:opacity-50 transition-all'>
                            <img src={baseAnime.images.webp.image_url} className='rounded-xl' alt="" />
                            <p className='absolute bottom-1 left-3 text-white bg-secendaryColor rounded-md p-2 opacity-90'>{baseAnime.score}</p>
                        </div>
                    )
                })
            }
        </div>
    </section>
  )
}

export default Animes