import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Rank from './rank.svg'
import Popularity from './popularity.svg'

function AnimeShow() {
    const [animeData, setAnimeData] = useState([])
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
        AnimeData()
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
                    // actors or characters or something else but populaye here bro
                </div>
            </div>
            </> 
            : null
        }
        
    </section>
  )
}

export default AnimeShow
