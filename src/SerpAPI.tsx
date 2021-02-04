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
      'X-Requested-With': 'XMLHttpRequest'
    },
    params: {
      ...searchParams,
      api_key: SERP_API_KEY,
      // q: searchParams,
      tbm: "shop", 
      hl: "en",
      gl: "us",
      
    }
  };




  return axios.get('https://cors-anywhere.herokuapp.com/'+SERP_API_PATH, APIParams)
    .then( response => {
      const searchResponse = response.data.shopping_results
    
      // const imgUrl = response.data.shopping_results[0].thumbnail
      // const imgTrimmedUrl = imgUrl.replace('data:image/jpeg;base64,','')
      // setImageUrl(imgTrimmedUrl)

      const searchResults = searchResponse.map((searchObject: SearchResponse) => (
        { 
        title: searchObject.title,
        // thumbnail: trimBase64(searchObject.thumbnail)
        thumbnail: searchObject.thumbnail

        // extracted_price: searchObject.extracted_price, 
        // link: searchObject.link,
      } ))

      return searchResults
    })
    .catch (error => {
      return error.message
    })
}