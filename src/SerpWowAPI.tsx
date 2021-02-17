import axios from 'axios'

const SERPWOW_API_KEY = process.env.REACT_APP_SERPWOW_API_KEY
const SERPWOW_API_PATH = `https://api.serpwow.com/live/search?`


interface Price {
  symbol: string,
  value : number,
  currency: string,
  raw: string,
  // name?: string
  // is_free?: boolean
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

export const fetchSerpWowSearchResults = async (searchQuery: string, colorName: string) => {
  const APIParams = {
    params: {
      q: `${colorName} ${searchQuery}`,
      api_key: SERPWOW_API_KEY,
      engine: "amazon",
      // page: 1
    }
  };
  
  console.log(`Now searching for ${colorName} ${searchQuery}...`)
  return axios.get(SERPWOW_API_PATH, APIParams)
    .then( response => {
      const searchResults = response.data.amazon_results

      const parsedSearchResults = searchResults.map((searchObject: SearchResponse) => (
        { 
        title: searchObject.title,
        imageUrl: searchObject.image,
        price: ( searchObject.price ? searchObject.price.raw : '' ),
        link: searchObject.link
      } ))

      return parsedSearchResults

    })
    .catch (error => {
      console.log('Error response from Serp API:', error)

      return error.message
    })
}