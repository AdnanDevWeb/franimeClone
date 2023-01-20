import React from 'react'
import './App.css'
import monitor from './monitor.svg'
import home from './home.svg'
import enter from './enter.svg'
import { Link } from 'react-router-dom'
function Nav() {
  return (
    <nav  className='flex justify-evenly items-center pr-4 pl-4 md:pl-16 h-16 w-full bg-secendaryColor  text-slate-50'>
        <p className='h-fit text-3xl font-bold'>Anime<span className='text-red-500'>Flix</span></p>
        <div className='flex w-auto grow justify-end gap-4'>
            <input type="text" className='md:block rounded-lg bg-mainColor p-2 hidden focus:outline-none pl-4 ' name="" id="" placeholder='Rechercher...' />
            <Link to="/">
                <div className='mt-2 flex items-center gap-2 cursor-pointer'>
                    <img className='w-6' src={home} alt="" />
                    <p>Accueil</p>
                </div>
            </Link>
            <Link to='/animes'>
                <div className='mt-2 flex items-center gap-2 cursor-pointer'>
                    <img className='w-6' src={monitor} alt="" />
                    <p>Animes</p>
                </div>
            </Link>
            <div className='md:flex hidden bg-red-600 rounded-lg p-2 items-center gap-2 cursor-pointer'>
                <img className='w-6' src={enter} alt="" />
                <p>Connexion</p>
            </div>
        </div>
    </nav>
  )
}

export default Nav