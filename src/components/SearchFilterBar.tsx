import React from 'react'
import ColorPalette from './ColorPalette';
import { ColorPaletteProps } from './ColorPalette'
import './SearchFilterBar.css'

interface SearchFilterProps extends ColorPaletteProps {
  image: string
}

const SearchFilterBar: React.FC<SearchFilterProps> = ({image, colors, onClickColorCallback}) => {

  return(
    <div className='search-filter-bar'>
      <div className='reference-image-container'>
        { image ? <img src={image} alt='reference' className='reference-image'/> : null }
      </div>
      <div className='filter-label'>FILTER BY</div>
      <div className='filter-label'>Color</div>
      <ColorPalette colors={colors} onClickColorCallback={onClickColorCallback} />

      <div className='filter-label'>CATEGORIES</div>

 


    </div>



  )
}

export default SearchFilterBar