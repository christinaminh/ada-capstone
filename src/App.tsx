import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
import './App.css';
import Upload from './components/Upload'
import { fetchColorProperties } from './VisionAPI'
import ColorPalette from './components/ColorPalette';
import { ColorProps } from './components/Color'
import { fetchSearchResults } from './SerpAPI'
import SearchBar from './components/SearchBar'
import { SearchParams } from './components/SearchBar'
import ColorMatchedSearchResult from './components/ColorMatchedSearchResult';
import { SearchResultProps } from './components/ColorMatchedSearchResult'
import { filterSearchByColor } from './CompareColors'

const App: React.FC = () => {
  // const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState< string | null | void >(null)
  
  // const [imgUrl, setImageUrl] = useState<string>('')

  const [selectedColors, setSelectedColors] = useState<ColorProps[]>([])
  const [colorResults, setColorResults] = useState<ColorProps[]>([])

  const [searchResults, setSearchResults] = useState([])

  const [colorMatchedResults, setColorMatchedResults] = useState<SearchResultProps[]>([])

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

    fetchColorProperties(imgUrl, 1)
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
          setSelectedColors(response)
        }
      })
  }

  
  const onSearchSubmit = (searchParams: SearchParams) => {
    if(selectedColors.length === 0){
      setErrorMessage('Select colors to search')
    } else {
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
  }

  const initialRender = useRef(true)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
    } else {
      const colorMatchedResults: SearchResultProps[] = filterSearchByColor(selectedColors, searchResults)

      setColorMatchedResults(colorMatchedResults)
    }

  }, [searchResults, selectedColors])

  

  return (
    <div className='App'>
      <header className='App-header'>

    <main>
    { errorMessage ? <div>{errorMessage}</div> : null }

      <Upload onImageSubmit={onImageSubmit} />
      <ColorPalette colors={colorResults} onClickColorCallback={onClickColor}/>

      <SearchBar onSearchSubmitCallback={onSearchSubmit}/>

      { (colorMatchedResults as SearchResultProps[]).map( ( (item, i) => (
        <ColorMatchedSearchResult key={i} title={item.title} thumbnail={item.thumbnail}/>
      )))}

    </main>
    </header>

    </div>
  );
}

export default App;
