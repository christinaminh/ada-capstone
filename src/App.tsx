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
import { deltaE } from './CompareColors'

import { fetchSerpWowSearchResults } from './SerpWowAPI'

const App: React.FC = () => {
  // const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState< string | null | void >(null)
  const [selectedColors, setSelectedColors] = useState<ColorProps[]>([])
  const [colorResults, setColorResults] = useState<ColorProps[]>([])

  const [searchResults, setSearchResults] = useState<SearchResultProps[]>([])

  const [colorMatchedResults, setColorMatchedResults] = useState<SearchResultProps[]>([])


  // const [colors, setColors] = useState([])

  // const renderSwatches = () => {

  //   return colors.map((color, id) => {
  //     return (
  //       <div
  //         key={id}
  //         style={{
  //           backgroundColor: color,
  //           width: 100,
  //           height: 100
  //         }}
  //       />
  //     )
  //   })
  // }

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
    // setColorResults([])
    // setSelectedColors([])

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
      fetchSerpWowSearchResults(searchParams)
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

    const filterSearchByColor = async (selectedColors: ColorProps[], searchResults: SearchResultProps[]) => {
      const colorMatches: SearchResultProps[] = []

      for( const searchResult of searchResults) {
        await fetchColorProperties(searchResult.imageUrl, 2)
          .then( colorPropertiesOfSearchResults  => {
            if( typeof colorPropertiesOfSearchResults === 'object') {
    
              for(const searchResultColorObject of colorPropertiesOfSearchResults) {
                const colorDiff = deltaE(searchResultColorObject.color, selectedColors[0].color)
        
                console.log("color difference", colorDiff)
        
                if(colorDiff < 20){
                  console.log('color match!')
                  console.log('search result that matched', searchResult)
                  colorMatches.push(searchResult)
                  break
                }
              }
            }
          })
      }
      setColorMatchedResults(colorMatches)
    }

    filterSearchByColor(selectedColors, searchResults)

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
        <ColorMatchedSearchResult key={i} title={item.title} imageUrl={item.imageUrl}/>
      )))}

    </main>
    </header>

    </div>
  );
}

export default App;
