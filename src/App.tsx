import React from 'react';
import axios from 'axios';
import './App.css';
// import Colors from './Colors'

const App: React.FC = () => {
  const VISION_API_KEY = process.env.REACT_APP_VISION_API_KEY
  const VISION_API_PATH = `https://vision.googleapis.com/v1/images:annotate?key=${VISION_API_KEY}`

  let body = {
    requests: [
      {
        image: {
          source: {
            gcsImageUri: "gs://cloud-samples-data/vision/image_properties/bali.jpeg"
          }
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

  console.log(VISION_API_KEY)

  const onImageSubmit = () => {
    axios.post(VISION_API_PATH, body)
      .then( response => {
        console.log(response)
      })
      .catch (error => {
        console.log(error)
        
      })
  }
  




  return (
    <div className="App">
      <header className="App-header">

          <button onClick={onImageSubmit}>Submit</button>

      </header>
    </div>
  );
}

export default App;
