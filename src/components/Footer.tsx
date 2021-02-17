import React from 'react'
import { NavLink } from "react-router-dom";
import './Footer.css'
import facebook from '../images/facebook.svg'
import twitter from '../images/twitter.svg'
import youtube from '../images/youtube.svg'

const Footer = () => {
  return(
    <div className='footer'>
      <nav className='footer-nav'> 
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/'>About us</NavLink>
          </li>
          <li>
            <NavLink to='/'>Contact</NavLink>
          </li>
        </ul>
      </nav>

      <div className='social'>
        <img src={facebook} alt='facebook icon' />
        <img src={twitter} alt='twitter icon' />
        <img src={youtube} alt='youtube icon' />
      </div>

      <div className='copy'>
        © Copyright 2021 - Furnie.
      </div>
    </div>
  )
}

export default Footer