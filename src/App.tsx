import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App: React.FC = () => {
  const VISION_API_KEY = process.env.REACT_APP_VISION_API_KEY
  const VISION_API_PATH = `https://vision.googleapis.com/v1/images:annotate?key=${VISION_API_KEY}`

  const SERP_API_KEY = process.env.REACT_APP_SERP_API_KEY
  const SERP_API_PATH = `https://serpapi.com/search.json`

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string|null>(null)


  const [imgUrl, setImageUrl] = useState<string>('')
  const [selectedColors, setSelectedColors] = useState([])


  type ObjectArray = Array<object>;
  const [searchResults, setSearchResults] = useState<ObjectArray | null >([])




  const visionRequestBody = {
      requests: [
        {
          image: {
            content: imgUrl
          },
          features: [
            {
              maxResults: 5,
              type: "IMAGE_PROPERTIES"
            },
          ]
        }
      ]
    }

 interface ColorResponseObject {
    score: number,
    pixelFraction: number,
    color: {
      red: number,
      green: number,
      blue: number
    }
  }

  const onImageSubmit = () => {
    axios.post(VISION_API_PATH, visionRequestBody)
      .then( response => {
        const colorResponse = response.data.responses[0].imagePropertiesAnnotation.dominantColors.colors
        const dominantColors = colorResponse.map((colorObject: ColorResponseObject) => ( {...colorObject.color, score: colorObject.score} ))
        setSelectedColors(dominantColors)
        console.log(dominantColors)
      })
      .catch( error => {
        setErrorMessage(error.message)
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

  const onSearchSubmit= () => {

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


  const [selectedFileUrl, setSelectedFileUrl] = useState<string | undefined>('')
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement | null>) => {
    const file: File = (event.target.files as FileList)[0];
    const fileUrl = URL.createObjectURL(file)
    setSelectedFileUrl(fileUrl)

    // Convert file to base64 string
    const reader = new FileReader()
    reader.readAsDataURL(file); 
    reader.onloadend = () => {
        const base64Data = reader.result
        const trimmedBase64Url = (base64Data as string).replace('data:image/jpeg;base64,','')               
        setImageUrl(trimmedBase64Url);
    }    
  }
  

  return (
    <div className='App'>
      <header className='App-header'>

      { errorMessage ? <div>{errorMessage}</div> : null }

      <input type='file' id="fileItem" onChange={handleFileSelect}  ></input>
      {/* <img src={selectedFileUrl} alt=''></img> */}

      <button onClick={onImageSubmit}>Submit Image</button>
      <button onClick={onSearchSubmit}>Search</button>
      

      </header>
    </div>
  );
}

export default App;
