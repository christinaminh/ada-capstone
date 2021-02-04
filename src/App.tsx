import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Upload from './components/Upload'
import { fetchColorProperties } from './VisionAPI'

const App: React.FC = () => {


  const SERP_API_KEY = process.env.REACT_APP_SERP_API_KEY
  const SERP_API_PATH = `https://serpapi.com/search.json`

  // const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState< string | null | void >(null)
  
  const [imgUrl, setImageUrl] = useState<string>('')

 
  const [selectedColors, setSelectedColors] = useState([])


  type ObjectArray = Array<object>;
  const [searchResults, setSearchResults] = useState< ObjectArray | null >([])





  const onImageSubmit = (imgUrl: string) => {
    fetchColorProperties(imgUrl)
      .then(response => {
        console.log(response)
        if(typeof response === 'string'){
          setErrorMessage(response)

          setTimeout(() => {
            setErrorMessage(null)
          }, 6000)

        } else if( typeof response === 'object') {
          setSelectedColors(response)
        }
      })
  }


  const queryParams = {
    headers:{
      'X-Requested-With': 'XMLHttpRequest'
    },
    params: {
      api_key: SERP_API_KEY,
      q: "tv",
      tbm: "shop",
      hl: "en",
      gl: "us"
    }
  };


  // interface SearchResult {
  //   shopping_results: 
  //   extracted_price: number,
  //   link: string,
  //   product_link: string,
  //   rating: number,
  //   thumbnail: string,
  //   snippet: string,
  //   title: string
  // }

  const onSearchSubmit = () => {

    axios.get('https://cors-anywhere.herokuapp.com/'+SERP_API_PATH, queryParams)
      .then( response => {
        console.log(response.data.shopping_results)

        const searchResults = response.data.shopping_results
      
        // const imgUrl = response.data.shopping_results[0].thumbnail
        // const imgTrimmedUrl = imgUrl.replace('data:image/jpeg;base64,','')
        // setImageUrl(imgTrimmedUrl)
      })
      .catch (error => {
        console.log(error.message)
      })
  }

  

  return (
    <div className='App'>
      <header className='App-header'>

      { errorMessage ? <div>{errorMessage}</div> : null }

      <Upload onImageSubmit={onImageSubmit} />


      {/* <button onClick={onImageSubmit}>Submit Image</button> */}
      <button onClick={onSearchSubmit}>Search</button>
      

      </header>
    </div>
  );
}

export default App;
