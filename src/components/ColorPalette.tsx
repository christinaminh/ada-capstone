import React from 'react';
import { ColorProps } from './Color'
import Color from './Color'


interface Props {
  colors: ColorProps[]
}

const ColorPalette: React.FC<Props> = ({colors}) => {
  return(
    <div>
      {colors.map( (color, i) => (
        <Color key={i} red={color.red} green={color.green} blue={color.blue} score={color.score}/>
      ))}
    </div>
  )
}

export default ColorPalette

