import React from 'react'
import './App.css'
import monitor from './monitor.svg'
import home from './home.svg'
import enter from './enter.svg'

function Nav() {
  return (
    <nav  className='flex justify-evenly items-center pr-4 pl-16 h-16 w-full bg-secendaryColor  text-slate-50'>
        <p className='h-fit text-3xl font-bold'>Anime<span className='text-red-500'>Flix</span></p>
        <div className='flex w-auto grow justify-end gap-4'>
            <input type="text" className='rounded-lg bg-mainColor p-2 focus:outline-none pl-4 ' name="" id="" placeholder='Rechercher...' />
            <div className='flex items-center gap-2 cursor-pointer'>
                <img className='w-6' src={home} alt="" />
                <p>Accueil</p>
            </div>
            <div className='flex items-center gap-2 cursor-pointer'>
                <img className='w-6' src={monitor} alt="" />
                <p>Animes</p>
            </div>
            <div className='flex items-center gap-2 cursor-pointer'>
                <img className='w-6' src={enter} alt="" />
                <p>Connexion</p>
            </div>
        </div>
    </nav>
  )
}

export default Nav