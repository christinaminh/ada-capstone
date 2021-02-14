import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';
import UploadModal from './components/UploadModal'
import SearchFilterBar from './components/SearchFilterBar'
import { ColorProps } from './components/Color'
import ColorMatchedSearchResult from './components/ColorMatchedSearchResult';
import { SearchResultProps, ColorMatchedProps } from './components/ColorMatchedSearchResult'
import { deltaE, getColorName } from './CompareColors'
import { fetchSerpWowSearchResults } from './SerpWowAPI'
import splashy  from 'splashy'
import convert from 'color-convert'
import Header from './components/Header'
import './components/SearchPageLayout.css'

import { Circle } from 'styled-spinkit'


const App: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState< string | null | void >(null)
  const [selectedColors, setSelectedColors] = useState<ColorProps[]>([])
  const [colorResults, setColorResults] = useState<ColorProps[]>([])
  const [searchResults, setSearchResults] = useState<SearchResultProps[]>([])
  // const [colorMatchedResults, setColorMatchedResults] = useState<SearchResultProps[]>([])
    // const [colorMatchedResults, setColorMatchedResults] = useState<ColorMatchedProps>({})
  const [colorMatchedResults, setColorMatchedResults] = useState<ColorMatchedProps>({'1':[],'2':[],'3':[],'4':[],'5':[],'6':[]})
  const [selectedColorMatchedResults, setSelectedColorMatchedResults] = useState<SearchResultProps[]>([])

  const [uploadModalShow, setUploadModalShow] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false)
  const [referenceImage, setReferenceImage] = useState<string>('')


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
    setReferenceImage(imgUrl) 
    setColorResults([])
    setSelectedColors([])
    setSearchResults([])
    setColorMatchedResults({'1':[],'2':[],'3':[],'4':[],'5':[],'6':[]})
    setSelectedColorMatchedResults([])
    
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
          console.log('SET SELECTED COLORS')


          setSearchLoading(true)
          onSearchSubmit('home furniture', colorObjects)

        } else {
          setErrorMessage("Could not read image")

          setTimeout(() => {
            setErrorMessage(null)
          }, 6000)
        }
      })
  }


  
  // const onSearchSubmit = (searchParams: SearchParams) => {
  const onSearchSubmit = async (searchQuery: string, selectedColors: ColorProps[]) => {
    // setSearchLoading(true)

    console.log('IN SEARCH SUBMIT with colors', selectedColors)

    if(selectedColors.length === 0){
      setErrorMessage('Select colors to search')

    } else {
      let colorNameSet: any = new Set()
      for( const color of selectedColors) {
        colorNameSet.add(color.name)
      }

      console.log("~~~~~~~COLOR SET", colorNameSet)
      let newSearchResults = [...searchResults]

      for(let colorName of colorNameSet) {

        console.log('LOOKING FOR COLOR', colorName, 'before FETCH')
        await fetchSerpWowSearchResults(searchQuery, colorName)
        // eslint-disable-next-line no-loop-func
        .then( response => {
          // if response is an array of search results, set searchResults
          if( typeof response === 'object') {
            newSearchResults = newSearchResults.concat(response)

            console.log('I GOT SEARCH RESULTS!')

            setSearchResults(newSearchResults)
            
          // if response is an error string, set error message
          } else if(typeof response === 'string'){
            setErrorMessage(response)

            setTimeout(() => {
              setErrorMessage(null)
            }, 6000)

            console.log('NO SEARCH RESULTS! I GOT AN ERROR')

          }
        })
      }

      // setSearchResults(newSearchResults) 
    }
  }


  const initialRender = useRef(true)
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
    } else {

      if(searchResults.length > 0  && selectedColors.length > 0 ) {
        const filterSearchByColor = async (selectedColors: ColorProps[], searchResults: SearchResultProps[]) => {
          // const newColorMatches: SearchResultProps[] = [...colorMatchedResults]
          const newColorMatches: ColorMatchedProps = {...colorMatchedResults}
        
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
              
                      if(colorDiff < 5){
                        console.log('color match!')
                          newColorMatches[`${selectColor.id}`].push(searchResult)

                        // newColorMatches.push(searchResult)
                        break colorComparisonLoop
                      }
                    }
                  }
                }

                setColorMatchedResults(newColorMatches)
              })
            }
          // setColorMatchedResults(newColorMatches)
        }
    
        filterSearchByColor(selectedColors, searchResults)
    
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResults])

  
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
    } else {
      let selectedMatchedResults: SearchResultProps[] = []
      for(const color of selectedColors) {
        selectedMatchedResults = selectedMatchedResults.concat(colorMatchedResults[color.id])
      }

      
      setSelectedColorMatchedResults(selectedMatchedResults)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColors, colorMatchedResults])



  return (
    <Router>
      <div className='App'>

      <UploadModal 
        show={uploadModalShow} onHide={() => setUploadModalShow(false)} 
        onImageSubmitCallback={onImageSubmit} 
        colors={colorResults} 
        onClickColorCallback={onClickColor} 
        // onSearchSubmitCallback={onSearchSubmit}
      />

<Switch>
  <Route exact path='/search'>
      {/* <SearchPageLayout
        image={referenceImage} 
        colors={colorResults}
        selectedColors={selecte}
        onClickColorCallback={onClickColor}
        onSearchSubmitCallback={onSearchSubmit}
        colorMatchedResults={colorMatchedResults}
        setUploadModalShow={() => setUploadModalShow(true)}
      /> */}

    <div className='search-page'>
      <div className='search-header'>
        <Header />

        <button className='upload-button'onClick={() => setUploadModalShow(true)}>
          Upload a photo
        </button>

        { errorMessage ? <div>{errorMessage}</div> : null }
      </div>

      <SearchFilterBar 
      colors={colorResults}
      // selected={selectedColors}
      onClickColorCallback={onClickColor}         
      image={referenceImage} 
      />

      <div className='search-results-container'> 
        { searchLoading && (selectedColorMatchedResults.length === 0) ? 
          < Circle color={'#2A9D8F'}/> 
          :(selectedColorMatchedResults as SearchResultProps[]).map( ( (item, i) => (
            <ColorMatchedSearchResult key={i} title={item.title} imageUrl={item.imageUrl} price={item.price} link={item.link}/>
          )))
        }
      </div>
    </div>
  </Route>

  <Route path='/'>
    <Header />

      { errorMessage ? <div>{errorMessage}</div> : null }

      <button className='upload-button'onClick={() => setUploadModalShow(true)}>
          Upload a photo
      </button>


  </Route>

  <Route render={
    () => <h1>Not Found</h1>
  }/>



</Switch>


      </div>
    </Router>
  );
}

export default App;
