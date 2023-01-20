import React, { useEffect, useState } from 'react'
import { useParams,useNavigate, Link } from 'react-router-dom'
import Rank from './rank.svg'
import Popularity from './popularity.svg'

function AnimeShow() {
    const [animeData, setAnimeData] = useState([])
    const [animeCharacters, setAnimeCharacters] = useState([])
    const [recommandations, setRecommandations] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    const handleAnimeClick = (AnimeId) =>{
        navigate('/animes/' + AnimeId)
    }
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
          if(response.data != undefined){
              const characters = response.data
              const filteredCharacters = characters.filter(character => character.role.toLowerCase() === "main")
              setAnimeCharacters(filteredCharacters)
          }
      }

      const getRecommandations = async () =>{
          const response = await (
              await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`)
          ).json()
          if(response.data != null) {
              response.data.length = 10
              const recommandationsData = response.data
              setRecommandations(recommandationsData)
              console.log(recommandationsData);
          }
      }
    useEffect(()=>{
        AnimeData()
        getCharacters()
        getRecommandations()
      },[])
  return (
    <section className='p-4'>
        {
            animeData != undefined && Object.keys(animeData).length > 0 
            ? <>
            <div className='flex flex-col justify-center gap-6'>
                <img className='mx-auto my-auto rounded-xl w-[360px]' src={animeData.images.webp.large_image_url} alt="" />
                <div className='flex gap-3 justify-center'>
                    <p className='relative text-white bg-secendaryColor p-2 rounded-lg pl-10'>
                        <strong>Score: {animeData.score}</strong>
                        <img src={Popularity} className="absolute w-5 left-2 top-[12px]" alt="" />
                    </p>
                    <p className='relative text-white bg-secendaryColor p-2 rounded-lg pl-10'>
                        <strong>rank: {animeData.rank}</strong>
                        <img src={Rank} className="absolute w-5 left-2 top-[12px]" alt="" />
                    </p>
                    {
                        animeData.episodes == null
                         ? null
                         : <p className='relative text-white'>
                                <strong>Episodes: {animeData.episodes}</strong>
                           </p>
                    }
                    
                </div>

                <div className='flex flex-wrap gap-5 justify-center'>
                    {
                        animeData.genres.map(genre => {
                            return <p className=' text-white bg-secendaryColor p-2 rounded-lg'>{genre.name}</p>
                        }
                        )
                    }
                </div>
                <section className='rounded-md mx-auto my-auto outline font-bold text-white p-4 outline-slate-500 max-w-[300px] outline-1'>
                    <p>Status: {animeData.status}</p>
                    <p>Type: {animeData.type}</p>
                </section>
            </div>
            <div>
                <h1 className='text-white font-bold text-[2.2rem] line-clamp-1'>{animeData.title}</h1>
                <p className='line-clamp-6 text-slate-200 mb-6'>{animeData.synopsis}</p>
                <div>
                    <div className='flex flex-wrap gap-8 justify-center pt-16 relative before:content-["Personnage:"] before:absolute before:block before:top-0 before:text-white before:font-bold before:text-[2.2rem]'>
                        {
                            animeCharacters?.length > 0
                            ? animeCharacters.map(character =>{
                                return <div className='relative hover:scale-105 transition-all'>
                                    <img className='rounded-lg w-[150px]' src={character.character.images.webp.image_url} alt="" />
                                    <p className='absolute text-white font-bold bottom-0 text-center bg-secendaryColor w-full rounded-b-md p-2'>{character.character.name}</p>
                                </div>
                            })
                            : null
                        }
                    </div>
                </div>
                {
                    recommandations?.length > 0 
                    ? <div className='flex pt-[120px] flex-wrap gap-10 justify-center relative'>
                        <h1 className='absolute text-[2.1rem] text-white font-bold text-center top-16'>Anime Similaire: </h1>
                        {
                            recommandations.map(anime =>{
                                return <Link to={`/animes/${anime.entry.mal_id}`} onClick={() => {
                                    setId(anime.mal_id);
                                    animeData();
                                    getCharacters();
                                    getRecommandations()}}>
                                    <img className='rounded-xl h-full' src={anime.entry.images.webp.image_url} alt="" />
                                    <p className='text-white text-center font-bold max-w-[200px] line-clamp-1'>{anime.entry.title}</p>
                                </Link>
                            })
                        }
                    </div>
                    : null
                }
            </div>
            </> 
            : null
        }
        
    </section>
  )
}

export default AnimeShow
