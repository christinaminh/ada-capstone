import React from 'react';
import { ColorProps } from './Color'
import Color from './Color'


interface Props {
  colors: ColorProps[],
  onClickColorCallback: (color: ColorProps) => void
}

const ColorPalette: React.FC<Props> = ({colors, onClickColorCallback}) => {
  return(
    <div>
      {colors.map( (color, i) => (
        <Color key={i} color={color.color} score={color.score} selected={color.selected} onClickColorCallback={onClickColorCallback}/>
      ))}
    </div>
  )
}

export default ColorPalette

