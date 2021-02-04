import axios from 'axios'

export const fetchColorProperties = (imgUrl: string) => {
  const VISION_API_KEY = process.env.REACT_APP_VISION_API_KEY
  const VISION_API_PATH = `https://vision.googleapis.com/v1/images:annotate?key=${VISION_API_KEY}`

  let visionRequestBody


  if(imgUrl.startsWith('data')){
    imgUrl = imgUrl.slice(23,-1)
  }
  

  if(imgUrl.startsWith('http')) {
    visionRequestBody = {
      requests: [
        {
          image: {
            source: {
              imageUri: imgUrl
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
    
  } else {
    visionRequestBody = {
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

  return axios.post(VISION_API_PATH, visionRequestBody)
    .then( response => {
      if(response.data.responses[0].imagePropertiesAnnotation === undefined) {
        return 'Error: Cannot read image.'
      } else {
        const colorResponse = response.data.responses[0].imagePropertiesAnnotation.dominantColors.colors
        const dominantColors = colorResponse.map((colorObject: ColorResponseObject) => ( {...colorObject.color, score: colorObject.score} ))
        return dominantColors
      }
    })
    .catch( error => {
      return error.message
    })
}
