import React from 'react';
import { ColorProps } from './Color'
import Color from './Color'


export interface ColorPaletteProps {
  colors: ColorProps[],
  onClickColorCallback: (color: ColorProps) => void
}

const ColorPalette: React.FC<ColorPaletteProps> = ({colors, onClickColorCallback}) => {
  return(
    <div>
      {colors.map( (color, i) => (
        <Color key={i} color={color.color} id={color.id} onClickColorCallback={onClickColorCallback} name={color.name} />
      ))}
    </div>
  )
}

export default ColorPalette

