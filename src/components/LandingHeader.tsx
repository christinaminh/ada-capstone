import React from 'react'
import { NavLink } from "react-router-dom";
import './LandingHeader.css'
import logo from '../images/Logo.svg'

export interface HeaderProps {
  setUploadModalShow: (arg0: boolean) => void
}

const LandingHeader:React.FC<HeaderProps> = ({setUploadModalShow}) => {
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

        <img src={logo} alt='logo'className='landing-logo'/>

        <button className='upload-button'onClick={() => setUploadModalShow(true)}>
          Explore
         </button>
      </nav>

    </header>
  )
}

export default LandingHeader