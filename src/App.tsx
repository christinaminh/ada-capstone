import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
import './App.css';
import Upload from './components/Upload'
// import { fetchColorProperties } from './VisionAPI'
// import { extractColors } from './ExtractColor'

import ColorPalette from './components/ColorPalette';
import { ColorProps } from './components/Color'
// import { fetchSearchResults } from './SerpAPI'
import SearchBar from './components/SearchBar'
import { SearchParams } from './components/SearchBar'
import ColorMatchedSearchResult from './components/ColorMatchedSearchResult';
import { SearchResultProps } from './components/ColorMatchedSearchResult'
import { deltaE } from './CompareColors'
import { fetchSerpWowSearchResults } from './SerpWowAPI'

import { prominent } from 'color.js'
import splashy  from 'splashy'
import convert from 'color-convert'



const App: React.FC = () => {
  // const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState< string | null | void >(null)
  const [selectedColors, setSelectedColors] = useState<ColorProps[]>([])
  const [colorResults, setColorResults] = useState<ColorProps[]>([])

  const [searchResults, setSearchResults] = useState<SearchResultProps[]>([])

  const [colorMatchedResults, setColorMatchedResults] = useState<SearchResultProps[]>([])

  // Select/Deselect color from color palette
  const onClickColor = (clickedColor: ColorProps) => {
    let newSelectedColors: ColorProps[] = []

    if(clickedColor.selected){
      newSelectedColors = [...selectedColors]
      newSelectedColors.push(clickedColor)
    } else {
      selectedColors.forEach( pastSelectedColor => {
        if(clickedColor.id !== pastSelectedColor.id){
          newSelectedColors.push(pastSelectedColor)
        }
      })
    }

    setSelectedColors(newSelectedColors)
  }


  // After uploading image, call API to determine dominant colors in image
  const onImageSubmit = (imgUrl: string) => {    
    setColorResults([])
    setSelectedColors([])
    setColorMatchedResults([])

    //  extractColors(imgUrl, 1)
      // .then(response => {
    // prominent(imgUrl, { amount: 5, group: 40,  sample: 5 })
    splashy(imgUrl)
      .then( response => {
        // if response is an array of color objects, set colors
        // let i = 1
        // // if amount is 1
        //   const colorObject: ColorProps[] = [{
        //     color: response,
        //     id: i
        //   }]
        
          // setColorResults(colorObject)
          // setSelectedColors(colorObject)
        // // if amount is > 1

        const colorArray = response.map( color => {
          return convert.hex.rgb(color)
        })

        // let colorArray = response as Array<number[]>
        if(colorArray.length > 0) {
          const colorObjects: ColorProps[] = []
          let i = 1

          for( let color of colorArray ){
            colorObjects.push({
              color: color,
              id: i
            })

            i += 1
          }

          setColorResults(colorObjects)
          setSelectedColors(colorObjects)
        } else {
          setErrorMessage("Could not read image")

          setTimeout(() => {
            setErrorMessage(null)
          }, 6000)
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

      if(searchResults.length > 0  && selectedColors.length > 0 ) {
        const filterSearchByColor = async (selectedColors: ColorProps[], searchResults: SearchResultProps[]) => {
          const colorMatches: SearchResultProps[] = []
        
          console.log('IN FILTER SEARCH BY COLOR')
          for( const searchResult of searchResults) {
            console.log("URL:", searchResult.imageUrl)

            // await prominent(searchResult.imageUrl, { amount: 3, group: 30, sample: 1 })
            await splashy(searchResult.imageUrl)
              .then( response => {

                const colorArraySearchResults = response.map( color => {
                  return convert.hex.rgb(color)
                })
    
                // response is a nested array of rgb values [[r,g,b],...]
                // let colorArraySearchResults = response as Array<number[]>
                
                if( typeof colorArraySearchResults === 'object') {
                  for(let searchResultRGB of colorArraySearchResults) {

                    console.log("RGB of search result: ", searchResultRGB)
                    for(let selectColor of selectedColors) {
                      const colorDiff = deltaE(searchResultRGB, selectColor.color)
            
                      console.log("color difference", colorDiff)
              
                      if(colorDiff < 30){
                        console.log('color match!')
                        console.log('search result that matched', searchResult)
                        colorMatches.push(searchResult)
                        break
                      }
                    }
                  }
                }
              })
          }
          setColorMatchedResults(colorMatches)
        }
    
        filterSearchByColor(selectedColors, searchResults)
    
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResults])



  return (
    <div className='App'>
      <header className='App-header'>

    <main>
    { errorMessage ? <div>{errorMessage}</div> : null }

      <Upload onImageSubmit={onImageSubmit} />
      <ColorPalette colors={colorResults} onClickColorCallback={onClickColor} />
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
