import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Rank from './rank.svg'
import Popularity from './popularity.svg'

function AnimeShow() {
    const [animeData, setAnimeData] = useState([])
    const [animeCharacters, setAnimeCharacters] = useState([])
    const { id } = useParams()
    useEffect(()=>{
        const AnimeData = async () =>{
          const response = await (
            await fetch(`https://api.jikan.moe/v4/anime/${id}/full`)
          ).json()
          const anime = response.data
          setAnimeData(anime)
        //   console.log(animeData.images.webp.image_url);
        }
        const getCharacters = async () =>{
            const response = await (
                await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`)
            ).json()
            const characters = response.data
            const filteredCharacters = await characters.filter(character => character.role.toLowerCase() === "main")
            setAnimeCharacters(filteredCharacters)
            console.log(animeCharacters)
        }
        AnimeData()
        getCharacters()
      },[])
  return (
    <section>
        {
            Object.keys(animeData).length > 0 
            ? <>
            <div>
                <img src={animeData.images.webp.image_url} alt="" />
                <div className='flex gap-3'>
                    <p className='relative'>
                        <strong>Score: {animeData.score}</strong>
                        <img src={Popularity} className="absolute" alt="" />
                    </p>
                    <p className='relative'>
                        <strong>rank: {animeData.rank}</strong>
                        <img src={Rank} className="absolute" alt="" />
                    </p>
                    <p className='relative'>
                        <strong>Episodes: {animeData.episodes}</strong>
                    </p>
                </div>

                <div className='flex flex-wrap gap-3'>
                    {
                        animeData.genres.map(genre => {
                            return <p>{genre.name}</p>
                        }
                        )
                    }
                </div>
                <section>
                    <p>Status: {animeData.status}</p>
                    <p>Type: {animeData.type}</p>
                </section>
            </div>
            <div>
                <h1>{animeData.title}</h1>
                <p>{animeData.synopsis}</p>
                <div>
                    <div className='flex flex-wrap gap-8 justify-center'>
                        {
                            animeCharacters?.length > 0
                            ? animeCharacters.map(character =>{
                                return <div className='relative'>
                                    <img className='rounded-lg w-[150px]' src={character.character.images.webp.image_url} alt="" />
                                    <p className='absolute'></p>
                                </div>
                            })
                            : null
                        }
                    </div>
                </div>
            </div>
            </> 
            : null
        }
        
    </section>
  )
}

export default AnimeShow
