import React from 'react'
import { NavLink } from "react-router-dom";
import logo from '../images/Logo.svg'
import { HeaderProps } from './LandingHeader'


const SearchHeader:React.FC<HeaderProps> = ({setUploadModalShow}) => {
  return(
    <header>
      <nav className='search-header-nav header-nav'>
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

          <button className='upload-button'onClick={() => setUploadModalShow(true)}>
          Upload
         </button>
        </ul>


      </nav>
    </header>
  )
}

export default SearchHeader