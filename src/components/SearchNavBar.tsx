import React from 'react'
import ColorPalette from './ColorPalette';

import { ColorPaletteProps } from './ColorPalette'


const SearchNavBar: React.FC<ColorPaletteProps> = ({colors, onClickColorCallback}) => {

  return(
    <ColorPalette colors={colors} onClickColorCallback={onClickColorCallback} />
  )
}

export default SearchNavBar