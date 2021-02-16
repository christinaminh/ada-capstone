import React from 'react'
import { NavLink } from "react-router-dom";
import logo from '../images/Logo.svg'
import { HeaderProps } from './LandingHeader'


const SearchHeader:React.FC<HeaderProps> = ({setUploadModalShow}) => {
  return(
    <header>
      <nav className='header-nav'>
      <img src={logo} alt='logo'className='search-logo'/>
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
        
        <button className='upload-button'onClick={() => setUploadModalShow(true)}>
          Upload
         </button>
      </nav>
    </header>
  )
}

export default SearchHeader