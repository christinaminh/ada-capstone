 import React, { useState } from 'react';
 import './Color.css'

 export interface ColorProps {
  red: number,
  green: number,
  blue: number,
  score: number,
  selected?: boolean
 }

 interface ColorCallback {
  onClickColorCallback: (color: ColorProps) => void
 }


const Color: React.FC<ColorProps & ColorCallback> = ({...props}) => {
  const [selected, setSelected] = useState(true)

  const colorItemStyle = {
    backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`
  }


  const handleClickedColor = () => {
    const color = {
      red: props.red,
      green: props.green,
      blue: props.blue,
      score: props.score,
      selected: !selected
    }

    setSelected(color.selected)

    props.onClickColorCallback(color)
  }


  return(
    <div className={selected ? 'selected color-item': 'color-item'} style={colorItemStyle} onClick={handleClickedColor}>
      
    </div>
  )
}

export default Color

