import React from 'react'
import { NavLink } from "react-router-dom";
import './LandingHeader.css'
import Logo from '../images/Logo.svg'


const LandingHeader = () => {
  return(
    <header>
      <nav className='header-nav'> 
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/'>About</NavLink>
          </li>
          <li>
            <NavLink to='/'>Contact</NavLink>
          </li>
        </ul>

        <img src={Logo} alt='logo'className='landing-logo'/>

        <NavLink to='/' className='upload-button'>Explore</NavLink>
      </nav>

    </header>
  )
}

export default LandingHeader