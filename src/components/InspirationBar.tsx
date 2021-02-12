import React from 'react'
import ColorPalette from './ColorPalette';
import { ColorPaletteProps } from './ColorPalette'

export interface InspirationBarProps extends ColorPaletteProps {
  image: string
}

const InspirationBar: React.FC<InspirationBarProps> = ({image, colors, onClickColorCallback}) => {

  return (
    <div className='inspiration-bar'>
      <div className='reference-image-container'>
        <img src={image} alt='reference' className='reference-image'/>
      </div>

      {/* <div>Color</div>
       */}
      <ColorPalette colors={colors} onClickColorCallback={onClickColorCallback} />
 


    </div>

  )
}

export default InspirationBar