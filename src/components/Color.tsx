 import React from 'react';
 import './Color.css'


 export interface ColorProps {
  red: number,
  green: number,
  blue: number,
  score: number
 }


const Color: React.FC<ColorProps> = ({...props}) => {

  // for(const colorParameter in props){
  //   if(colorParameter === 'red' || colorParameter === 'green' || colorParameter === 'blue') {
  //     // console.log(colorParameter, 'and', props[colorParameter])
  //     document.documentElement.style.setProperty(`--${colorParameter}`, `${props[colorParameter]}`)
  //   }
  // }

  const colorItem = {
    backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`
  }




  return(
    <div className='color-item' style={colorItem} onClick={() => console.log('yay')}>
      
    </div>
  )
}

export default Color

