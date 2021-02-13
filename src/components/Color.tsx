 import React, { useState } from 'react';
 import './Color.css'
 import checkmark from '../images/checkmark.svg'

 export interface ColorProps {
  id: number,
  color: number[],
  selected?: boolean,
  name: string
 }

 interface ColorCallback {
  onClickColorCallback: (color: ColorProps) => void
 }


const Color: React.FC<ColorProps & ColorCallback> = ({...props}) => {
  const [selected, setSelected] = useState(true)
  
  const [red, green, blue] = props.color

  const colorItemStyle = {
    backgroundColor: `rgb(${red}, ${green}, ${blue})`
  }


  const handleClickedColor = () => {
    const color = {
      id: props.id,
      color: props.color,
      // score: props.score,
      selected: !selected,
      name: props.name
    }

    setSelected(color.selected)

    props.onClickColorCallback(color)
  }


  return(

      <div className={selected ? 'selected color-item': 'color-item '} style={colorItemStyle} onClick={handleClickedColor}>
        <img src={checkmark} alt='select color' className={selected ? 'checked' : 'unchecked'}/>

      </div>



      


  )
}

export default Color

