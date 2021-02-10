import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
import './App.css';
import UploadModal from './components/UploadModal'
// import { fetchColorProperties } from './VisionAPI'
// import { extractColors } from './ExtractColor'

// import ColorPalette from './components/ColorPalette';
import SearchNavBar from './components/SearchNavBar'

import { ColorProps } from './components/Color'
// import { fetchSearchResults } from './SerpAPI'
import SearchBar from './components/SearchBar'
// import { SearchParams } from './components/SearchBar'
import ColorMatchedSearchResult from './components/ColorMatchedSearchResult';
import { SearchResultProps } from './components/ColorMatchedSearchResult'
import { deltaE, getColorName } from './CompareColors'
import { fetchSerpWowSearchResults } from './SerpWowAPI'

// import { prominent } from 'color.js'
import splashy  from 'splashy'
import convert from 'color-convert'



const App: React.FC = () => {
  // const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState< string | null | void >(null)
  const [selectedColors, setSelectedColors] = useState<ColorProps[]>([])
  const [colorResults, setColorResults] = useState<ColorProps[]>([])

  const [searchResults, setSearchResults] = useState<SearchResultProps[]>([])

  const [colorMatchedResults, setColorMatchedResults] = useState<SearchResultProps[]>([])

  const [uploadModalShow, setUploadModalShow] = React.useState(false);

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
              id: i,
              name: getColorName(color)
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


  
  // const onSearchSubmit = (searchParams: SearchParams) => {
  const onSearchSubmit = async (searchQuery: string) => {

    if(selectedColors.length === 0){
      setErrorMessage('Select colors to search')
    } else {
      let colorNameSet: any = new Set()
      for( const color of selectedColors) {
        colorNameSet.add(color.name)
      }

      console.log("~~~~~~~COLOR SET", colorNameSet)

      for(let colorName of colorNameSet) {
        await fetchSerpWowSearchResults(searchQuery, colorName)
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


      // fetchSerpWowSearchResults(searchParams)
      //   .then( response => {
      //     // if response is an error string, set error message
      //     if(typeof response === 'string'){
      //       setErrorMessage(response)

      //       setTimeout(() => {
      //         setErrorMessage(null)
      //       }, 6000)

      //     // if response is an array of search results, set searchResults
      //     } else if( typeof response === 'object') {
      //       setSearchResults(response)
      //     }
      //   })
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

            // await prominent(searchResult.imageUrl, { amount: 3, group: 30, sample: 1 })
            await splashy(searchResult.imageUrl)
              .then( response => {

                const colorArraySearchResults = response.map( color => {
                  return convert.hex.rgb(color)
                })
    
                // response is a nested array of rgb values [[r,g,b],...]
                // let colorArraySearchResults = response as Array<number[]>
                
                if( typeof colorArraySearchResults === 'object') {
                  colorComparisonLoop:
                  for(let searchResultRGB of colorArraySearchResults) {
                    for(let selectColor of selectedColors) {
                      const colorDiff = deltaE(searchResultRGB, selectColor.color)
              
                      if(colorDiff < 10){
                        console.log('color match!')
                        console.log('search result that matched', searchResult)
                        colorMatches.push(searchResult)
                        break colorComparisonLoop
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

      </header>

    <main>
      { errorMessage ? <div>{errorMessage}</div> : null }

      <button className='upload-button'onClick={() => setUploadModalShow(true)}>
          Upload a photo
      </button>

      <UploadModal show={uploadModalShow} onHide={() => setUploadModalShow(false)} onImageSubmit={onImageSubmit} colors={colorResults} onClickColorCallback={onClickColor}/>
      <SearchBar onSearchSubmitCallback={onSearchSubmit}/>

      <SearchNavBar colors={colorResults} onClickColorCallback={onClickColor}/>

      { (colorMatchedResults as SearchResultProps[]).map( ( (item, i) => (
        <ColorMatchedSearchResult key={i} title={item.title} imageUrl={item.imageUrl}/>
      )))}


    </main>


    </div>
  );
}

export default App;
