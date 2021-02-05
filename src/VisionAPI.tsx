import axios from 'axios'
import { ColorProps } from './components/Color'

// const getBase64Image = async (imgUrl: string, callback: (dataURL: string) => void) => {
//   const img = new Image();

//   // onload fires when the image is fully loadded, and has width and height
//   console.log('LOADING BASE64 IMAGE')
//   img.onload = () => {
//     const canvas = document.createElement("canvas");
//     canvas.width = img.width;
//     canvas.height = img.height;
//     const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
//     ctx.drawImage(img, 0, 0);
//     let dataURL = canvas.toDataURL("image/png").replace(/^data:image\/(png|jpg|webp);base64,/, "")
//         // dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

    
//     callback(dataURL); // the base64 string

//   };

//   // set attributes and src 
//   img.setAttribute('crossOrigin', 'anonymous'); //
//   img.src = imgUrl;
// }

export const fetchColorProperties = async (imgUrl: string, maxNumResults: number) => {
  const VISION_API_KEY = process.env.REACT_APP_VISION_API_KEY
  const VISION_API_PATH = `https://vision.googleapis.com/v1/images:annotate?key=${VISION_API_KEY}`

  let visionRequestBody


  // let base64Url

  // if(imgUrl.startsWith('http')){
  //   base64Url = await getBase64Image(imgUrl, (dataURL) => {return dataURL} )
  // } else {
  //   base64Url = imgUrl
  // }

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
              maxResults: maxNumResults,
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
            // content: base64Url
            content: imgUrl
          },
          features: [
            {
              maxResults: maxNumResults,
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
        // console.log("BAD search result url:", imgUrl)
        // console.log('RESPONSE when CANT READ IMAGE', response)
        return 'Error: Cannot read image.'
      } else {
        // console.log("GOOD search result url:", imgUrl)
        // console.log('RESPONSE when GOOD', response)

        const colorResponse = response.data.responses[0].imagePropertiesAnnotation.dominantColors.colors
        const dominantColors: ColorProps[]= colorResponse.map((colorObject: ColorResponseObject) => ( {color: [colorObject.color.red, colorObject.color.green, colorObject.color.blue], score: colorObject.score} ))
        return dominantColors
      }
    })
    .catch( error => {
      return error.message
    })
}
