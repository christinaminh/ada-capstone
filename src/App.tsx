import React, { useState } from 'react';
// import axios from 'axios';
import './App.css';
import Upload from './components/Upload'
import { fetchColorProperties } from './VisionAPI'
import ColorPalette from './components/ColorPalette';
import { ColorProps } from './components/Color'
import { fetchSearchResults } from './SerpAPI'
import SearchBar from './components/SearchBar'
import { SearchParams } from './components/SearchBar'
import SearchResult from './components/SearchResult';
import { SearchResultProps } from './components/SearchResult'

const App: React.FC = () => {
  // const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState< string | null | void >(null)
  
  // const [imgUrl, setImageUrl] = useState<string>('')

  const [selectedColors, setSelectedColors] = useState<ColorProps[]>([])
  const [colorResults, setColorResults] = useState<ColorProps[]>([])


  const [searchResults, setSearchResults] = useState([])


  // Select/Deselect color from color palette
  const onClickColor = (clickedColor: ColorProps) => {
    let newSelectedColors: ColorProps[] = []

    if(clickedColor.selected){
      newSelectedColors = [...selectedColors]
      newSelectedColors.push(clickedColor)
    } else {
      selectedColors.forEach( pastSelectedColor => {
        if(clickedColor.score !== pastSelectedColor.score){
          newSelectedColors.push(pastSelectedColor)
        }
      })
    }

    setSelectedColors(newSelectedColors)
  }


  // After uploading image, call Vision API to determine dominant colors in image
  const onImageSubmit = (imgUrl: string) => {
    setColorResults([])
    setSelectedColors([])

    fetchColorProperties(imgUrl)
      .then(response => {
        // if response is an error string, set error message
        if(typeof response === 'string'){
          setErrorMessage(response)

          setTimeout(() => {
            setErrorMessage(null)
          }, 6000)

        // if response is an array of color objects, set colors
        } else if( typeof response === 'object') {
          setColorResults(response)
        }
      })
  }

  const onSearchSubmit = (searchParams: SearchParams) => {
    setSearchResults([])

    fetchSearchResults(searchParams)
      .then( response => {
        // if response is an error string, set error message
        if(typeof response === 'string'){
          setErrorMessage(response)

          setTimeout(() => {
            setErrorMessage(null)
          }, 6000)

        // if response is an array of search results, set searchResults
        } else if( typeof response === 'object') {
          setSearchResults(response)
        }
      })
  }



  return (
    <div className='App'>
      <header className='App-header'>


    <main>
    { errorMessage ? <div>{errorMessage}</div> : null }

      <Upload onImageSubmit={onImageSubmit} />
      <ColorPalette colors={colorResults} onClickColorCallback={onClickColor}/>

      {/* <button onClick={onSearchSubmit}>Search</button> */}
      <SearchBar onSearchSubmitCallback={onSearchSubmit}/>

      { (searchResults as SearchResultProps[]).map( ( (item, i) => (
        <SearchResult key={i} title={item.title} thumbnail={item.thumbnail}/>
      )))}

    </main>
    </header>

    </div>
  );
}

export default App;
