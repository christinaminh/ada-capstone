import axios from 'axios'
import { SearchParams } from './components/SearchBar'

const SERPWOW_API_KEY = process.env.REACT_APP_SERPWOW_API_KEY
const SERPWOW_API_PATH = `https://api.serpwow.com/live/search?`


interface Price {
  symbol: string,
  value : number,
  currency: string,
  raw: string,
  name: string
  is_free?: boolean
}

interface Categories {
  name: string,
  id: string
}

interface SearchResponse {
  position: number,
  title: string,
  asin: string,
  link: string,
  categories: Categories[],
  image: string,
  is_prime: boolean,
  is_amazon_fresh: boolean,
  is_whole_foods_market: boolean,
  rating: number,
  ratings_total: number,
  sponsored: boolean,
  prices: Price[]
  price: Price,
  delivery: {
    tagline: string
    price: Price
  }
}

export const fetchSerpWowSearchResults = (searchParams: SearchParams) => {
  const APIParams = {
    params: {
      ...searchParams,
      api_key: SERPWOW_API_KEY,
      engine: "amazon",
      amazon_domain: "amazon.com",

    }
  };

    return axios.get('https://cors-anywhere.herokuapp.com/'+SERPWOW_API_PATH, APIParams)
    .then( response => {
      const searchResults = response.data.amazon_results

      const parsedSearchResults = searchResults.map((searchObject: SearchResponse) => (
        { 
        title: searchObject.title,
        imageUrl: searchObject.image
      } ))

      console.log(parsedSearchResults)
      return parsedSearchResults

    })
    .catch (error => {
      return error.message
    })
}