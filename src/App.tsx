import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
// import Colors from './Colors'

const App: React.FC = () => {
  const VISION_API_KEY = process.env.REACT_APP_VISION_API_KEY
  const VISION_API_PATH = `https://vision.googleapis.com/v1/images:annotate?key=${VISION_API_KEY}`

  const SERP_API_KEY = process.env.REACT_APP_SERP_API_KEY
  const SERP_API_PATH = `https://serpapi.com/search.json`

  const [imgUrl, setImageUrl] = useState('')

  let body = {
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

  const onImageSubmit = () => {
    axios.post(VISION_API_PATH, body)
      .then( response => {
        console.log(response.data.responses[0].imagePropertiesAnnotation.dominantColors.colors)
      })
      .catch (error => {
        console.log(error.message)
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

  const onSearchSubmit= () => {

    axios.get('https://cors-anywhere.herokuapp.com/'+SERP_API_PATH, queryParams)
      .then( response => {
        // console.log(response.data.shopping_results)
        const imgUrl = response.data.shopping_results[0].thumbnail
        const imgTrimmedUrl = imgUrl.replace('data:image/jpeg;base64,','')
        // setImageUrl(imgTrimmedUrl)
      })
      .catch (error => {
        console.log(error.message)
      })
  }

  // function getDataUri(url, callback) {
  //   var image = new Image();

  //   image.onload = function () {
  //       var canvas = document.createElement('canvas');
  //       canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
  //       canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

  //       canvas.getContext('2d').drawImage(this, 0, 0);

  //       // Get raw image data
  //       callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

  //       // ... or get as Data URI
  //       callback(canvas.toDataURL('image/png'));
  //   };

  //   image.src = url;
  // }



  return (
    <div className="App">
      <header className="App-header">

          <button onClick={onImageSubmit}>Submit Image</button>
          <button onClick={onSearchSubmit}>Search</button>

      </header>
    </div>
  );
}

export default App;
