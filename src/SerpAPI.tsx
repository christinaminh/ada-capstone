import axios from 'axios'
import { SearchParams } from './components/SearchBar'

const SERP_API_KEY = process.env.REACT_APP_SERP_API_KEY
const SERP_API_PATH = `https://serpapi.com/search.json`

interface SearchResponse {
  extracted_price: number,
  link: string,
  position: number,
  price: string,
  product_id?: string,
  product_link?: string,
  rating?: number,
  reviews?: number,
  serpapi_product_api?: string,
  source: string,
  thumbnail: string,
  snippet?: string,
  title: string
  extensions?: string[]
}



export const fetchSearchResults = (searchParams: SearchParams) => {
  const APIParams = {
    headers:{
      'X-Requested-With': 'XMLHttpRequest',
      // 'Access-Control-Allow-Origin': '*'
    },
    params: {
      ...searchParams,
      api_key: SERP_API_KEY,
      tbm: "shop", 
      hl: "en",
      gl: "us",
      // tbs: "tbs=vw:g",
      num: "20"
    }
  };


  const trimTitle = (title: string) => {
    const regex = /(\d.\d+More style options)|(\d.\d+)/
    return title.replace(regex, '')
  }


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


  return axios.get('https://cors-anywhere.herokuapp.com/'+SERP_API_PATH, APIParams)
    .then( response => {
      const searchResults = response.data.shopping_results

      // searchResults.forEach( (result: SearchResponse) => {
      //   if(result.thumbnail.startsWith('http')) {
      //     getBase64Image(result.thumbnail, (dataURL) => {
      //       console.log(dataURL)
      //     })
      //   }
      // })


      const parsedSearchResults = searchResults.map((searchObject: SearchResponse) => (
        { 
        title: trimTitle(searchObject.title),
        thumbnail: (searchObject.thumbnail).replace(/^data:image\/(png|jpg|webp);base64,/, "")
      } ))

      return parsedSearchResults
    })
    .catch (error => {
      return error.message
    })
}