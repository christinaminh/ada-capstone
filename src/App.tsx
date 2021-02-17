import React, { useState, useEffect, useRef } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import splashy  from 'splashy'
import convert from 'color-convert'
import { Circle } from 'styled-spinkit'

import UploadModal from './components/UploadModal'
import SearchFilterBar from './components/SearchFilterBar'
import Header from './components/SearchHeader'
import LandingHeader from './components/LandingHeader'
import Footer from './components/Footer'
import ColorMatchedResults from './components/ColorMatchedResults'

import { ColorProps } from './components/Color'
import { SearchResultProps, ColorMatchedProps } from './components/ColorMatchedSearchResult'
import { deltaE, getColorName } from './CompareColors'
import { fetchSerpWowSearchResults } from './SerpWowAPI'

import './App.css';
import './components/SearchPageLayout.css'
import './components/LandingPage.css'
// import landing from './images/designer.svg'
import landing from './images/hero.svg'
import step1 from './images/step_1.svg'
import step2 from './images/step_2.svg'
import plusicon from './images/plus-icon.svg'
import MORE from './images/MORE.svg'



const App: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState< string | null | void >(null)
  const [selectedColors, setSelectedColors] = useState<ColorProps[]>([])
  const [colorResults, setColorResults] = useState<ColorProps[]>([])
  const [searchResults, setSearchResults] = useState<SearchResultProps[]>([])
  const [colorMatchedResults, setColorMatchedResults] = useState<ColorMatchedProps>({'1':[],'2':[],'3':[],'4':[],'5':[],'6':[]})
  const [selectedColorMatchedResults, setSelectedColorMatchedResults] = useState<SearchResultProps[]>([])
  const [uploadModalShow, setUploadModalShow] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false)
  const [referenceImage, setReferenceImage] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const resultsPerPage = 9
  const [next, setNext] = useState(resultsPerPage)


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

    resetSearch()

    splashy(imgUrl)
      .then( response => {
        const colorArray = response.map( color => {
          return convert.hex.rgb(color)
        })

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
          setSearchQuery('home furniture')

        } else {
          setErrorMessage("Could not read image")

          setTimeout(() => {
            setErrorMessage(null)
          }, 6000)
        }
      })
  }

  const resetSearch = () => {
    setSearchResults([])
    setColorMatchedResults({'1':[],'2':[],'3':[],'4':[],'5':[],'6':[]})
    setSelectedColorMatchedResults([])
    setNext(resultsPerPage)
    setSearchLoading(true)
  }

  const initialSearchRender = useRef(true)
  useEffect(()=> {
    let searchIsMounted = true

    
    const onSearchSubmit = async (newSearchQuery: string) => {
      if(!referenceImage){
        setErrorMessage('Upload image to start search')

      } else if (selectedColors.length === 0){
        setErrorMessage('Select colors to search')

        setTimeout(() => {
          setErrorMessage(null)
        }, 6000)

      } else {
        let colorNameSet: any = new Set()
        for( const color of selectedColors) {
          colorNameSet.add(color.name)
        }

        let newSearchResults = [...searchResults]

        // for(let colorName of colorNameSet) {
        //   if (searchIsMounted) {
        //     await fetchSerpWowSearchResults(newSearchQuery, colorName)
        //       // eslint-disable-next-line no-loop-func
        //       .then( response => {
        //         // if response is an array of search results, set searchResults
        //         if( typeof response === 'object') {

        //           if (searchIsMounted) {
        //             newSearchResults = newSearchResults.concat(response)
      
        //             setSearchResults(newSearchResults)
        //           }

        //         // if response is an error string, set error message
        //         } else if(typeof response === 'string'){
                  
        //           if( response.includes('402') ) {
        //             setErrorMessage('Number of searches has exceeded the limit. Please notify site owner to scrounge up some couch pennies to increase search limit.')
        //             setSearchLoading(false)
        //           } else {
        //             setErrorMessage(response)

        //             setTimeout(() => {
        //               setErrorMessage(null)
        //             }, 6000)
        //           }
        //         }
        //     })
        //   }
        // }

        const promises = []

        for(let colorName of colorNameSet) {
          if (searchIsMounted) {
            promises.push(fetchSerpWowSearchResults(newSearchQuery, colorName))
          }
        }

            // Promise.all is rejected if any of the elements are rejected. 
        Promise.all(promises)
          // eslint-disable-next-line no-loop-func
          .then( allResponses => {
            // if response is an array of search results, set searchResults
            for( const response of allResponses ) {
              if( typeof response === 'object') {

                if (searchIsMounted) {
                  newSearchResults = newSearchResults.concat(response)
                  setSearchResults(newSearchResults)
                }

              // if response is an error string, set error message
              } else if(typeof response === 'string'){
                
                if( response.includes('402') ) {
                  setErrorMessage('Number of searches has exceeded the limit. Please notify site owner to scrounge up some couch pennies to increase search limit.')
                  setSearchLoading(false)
                } else {
                  setErrorMessage(response)

                  setTimeout(() => {
                    setErrorMessage(null)
                  }, 6000)
                }
              }
            }
        })
      }
    }

    if (initialSearchRender.current) {
      console.log('Initial Search Render')
      initialSearchRender.current = false
    } else {
      if (searchIsMounted) {
        onSearchSubmit(searchQuery)
      }
    }

    return () => {
      searchIsMounted = false
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery])

  const initialColorFilterRender = useRef(true)
  useEffect(() => {
    let colorComparisonIsMounted = true

    const filterSearchByColor = async (selectedColors: ColorProps[], searchResults: SearchResultProps[]) => {
      const newColorMatches: ColorMatchedProps = {...colorMatchedResults}
      
      const promises = [] 
      for( const searchResult of searchResults) {
        if (colorComparisonIsMounted) {
          promises.push({ 
            colors: splashy(searchResult.imageUrl), 
            searchResult: searchResult 
          })
        }
      }

      Promise.all(promises)
        .then( async allResponses => {
          
          for( const response of allResponses ) {
            const colorArraySearchResults = (await response.colors).map( ( color: string ) => {
              return convert.hex.rgb(color)
            })
            
            if( typeof colorArraySearchResults === 'object') {
              colorComparisonLoop:
              for(let searchResultRGB of colorArraySearchResults) {
                for(let selectColor of selectedColors) {
                  const colorDiff = deltaE(searchResultRGB, selectColor.color)
          
                  if(colorDiff < 5 && !newColorMatches[`${selectColor.id}`].includes(response.searchResult)){
                    newColorMatches[`${selectColor.id}`].push(response.searchResult)
                    break colorComparisonLoop
                  }
                }
              }
            }
          }
        })

      setColorMatchedResults(newColorMatches)
    }


    if (initialColorFilterRender.current) {
      console.log('Initial Color Filtering Render')
      initialColorFilterRender.current = false
    } else {
      if (colorComparisonIsMounted && searchResults.length > 0 && selectedColors.length > 0 ) {
        filterSearchByColor(selectedColors, searchResults)
      }
    }

    return () => {
      colorComparisonIsMounted = false
    }  
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResults])

  
  const initialColorMatchedRender = useRef(true)

  useEffect(() => {
    if (initialColorMatchedRender.current) {
      console.log('Initial Color Matching Render')
      initialColorMatchedRender.current = false
    } else if ( selectedColors.length < 6 ) {
      let selectedMatchedResults: SearchResultProps[] = []

      for(const color of selectedColors) {
        selectedMatchedResults = selectedMatchedResults.concat(colorMatchedResults[color.id])
      }

      setSelectedColorMatchedResults(selectedMatchedResults)
    } else {
      if ( colorMatchedResults !== {'1':[],'2':[],'3':[],'4':[],'5':[],'6':[]} ) {
      
        const newMatchedResults = [...selectedColorMatchedResults]

        for(const colorKey in colorMatchedResults) {
          const resultArray = colorMatchedResults[colorKey]
          for( const result of resultArray ){
            if(!newMatchedResults.includes(result)) {
              newMatchedResults.push(result)
            }
          }
        }

        setSelectedColorMatchedResults(newMatchedResults)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColors, colorMatchedResults])

  
  const resultsToShow = selectedColorMatchedResults.slice(0, next)


  return (
    <Router>
      <div className='App'>

      <UploadModal 
        show={uploadModalShow} onHide={() => setUploadModalShow(false)} 
        onImageSubmitCallback={onImageSubmit} 
        colors={colorResults} 
        onClickColorCallback={onClickColor} 
      />

      <Switch>
        <Route exact path='/search'>
          <div className='search-page'>
            <div className='search-header'>
              <Header setUploadModalShow={setUploadModalShow}/>
            </div>

            <div className='search-main'>
              <div className='search-content'>
                { errorMessage ? <div className='error-message'>{errorMessage}</div> : <div className='error-message'></div> }

                <SearchFilterBar 
                  colors={colorResults}
                  onClickColorCallback={onClickColor}
                  image={referenceImage} 
                  setSearchQuery={setSearchQuery}
                  resetSearch={resetSearch}
                />

                <div className='search-results-container'> 
                  { searchLoading && (selectedColorMatchedResults.length === 0) ? 
                    < Circle color={'#2A9D8F'} size={60}/> 
                    :
                    <ColorMatchedResults resultsToRender={selectedColorMatchedResults.slice(0, next)}/>
                  }

                  { selectedColorMatchedResults.length > resultsToShow.length ? 
                    <div onClick={() => {setNext(next+resultsPerPage)}} className='load-more-button'><img src={MORE} alt='more results'className='more'/><span><img src={plusicon} alt='more results' className='plus-icon'/></span></div> : null }
                </div>
              </div>

              <Footer />
            </div>
          </div>
        </Route>

        <Route exact path='/'>
          <div className='landing-page'>
            <LandingHeader setUploadModalShow={setUploadModalShow}/>

            <div className='landing-main'>

              <div className='landing-content'>
                <img src={landing} alt='hero' className='landing-background'></img>

                <div className='landing-1'>
                  <h1>A new way to find your dream furniture</h1>
                  <p>Find furniture that fits your aesthetic. 
                    Furnie is here to modernize traditional furniture shopping. 
                    Quick, simple, and customized to your personal taste.</p>

                  <button className='upload-button'onClick={() => setUploadModalShow(true)}>
                    Upload a photo
                  </button>
                </div>

                <img src={step1} alt='step 1' className='step1-image'></img>

                <div className='landing-2'>
                  <h2>Upload Your Inspiration Photo</h2>
                  <p>All you have to do is select and upload your furniture inspiration photo, and we will do the rest. 
                    This can be done on either your phone and computer. 
                    It’s that simple and convenient!</p>
                </div>

                <img src={step2} alt='step 2' className='step2-image'></img>

                <div className='landing-3'>

                  <h2>Get Matched and Find Your Dream Furniture</h2>
                  <p>The top five colors in your inspiration photo will be used to find visually similar furniture for sale.</p> 
                  <p>You can use filters to narrow down your search results.</p>
                </div>
              </div>

              <Footer />
            </div>
          </div>
        </Route>

        <Route render={
          () => <h1>404: No furniture to be found here...</h1>
        }/>

      </Switch>


      </div>
    </Router>
  );
}

export default App;
