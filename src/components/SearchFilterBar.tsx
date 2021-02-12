import React from 'react'
import ColorPalette from './ColorPalette';

import { ColorPaletteProps } from './ColorPalette'
import InspirationBar from './InspirationBar';
import { InspirationBarProps } from './InspirationBar';

interface SearchFilterProps extends ColorPaletteProps, InspirationBarProps{

}

const SearchFilterBar: React.FC<SearchFilterProps> = ({image, colors, onClickColorCallback}) => {

  return(
    <div className='search-filter-bar'>
      { image ? <InspirationBar image={image} colors={colors} onClickColorCallback={onClickColorCallback}/> : null }
    </div>



  )
}

export default SearchFilterBar