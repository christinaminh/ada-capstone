import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
// import { SearchParams } from './components/SearchBar'

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
  console.log(`INSIDE fetchSerpWowSearchResults searching for ${colorName} ${searchQuery} `)

    // return axios.get('https://cors-anywhere.herokuapp.com/'+SERPWOW_API_PATH, APIParams)
    return axios.get(SERPWOW_API_PATH, APIParams)
    .then( response => {

      const searchResults = response.data.amazon_results
      console.log('searchResults', searchResults)

      const parsedSearchResults = searchResults.map((searchObject: SearchResponse) => (
        { 
        title: searchObject.title,
        imageUrl: searchObject.image,
        price: ( searchObject.price ? searchObject.price.raw : '' ),
        link: searchObject.link
      } ))

      console.log(parsedSearchResults)
      return parsedSearchResults

    })
    .catch (error => {
      console.log('BAD SERP RESPONSE', error)
      console.log('BAD PARAMS', APIParams)
      return error.message
    })
}