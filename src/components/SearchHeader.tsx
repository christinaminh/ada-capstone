import React from 'react'
import { NavLink } from "react-router-dom";
import Logo from '../images/Logo.svg'

const SearchHeader = () => {
  return(
    <header>
      <nav>
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

        <img src={Logo} alt='logo'/>

        <NavLink to='/'>Explore</NavLink>
      </nav>
    </header>
  )
}

export default SearchHeader