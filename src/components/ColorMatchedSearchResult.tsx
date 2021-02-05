import React from 'react'

export interface SearchResultProps {
  // extracted_price: number,
  // link: string,
  // product_link: string,
  // rating: number,
  thumbnail: string,
  // snippet: string,
  title: string
}


const SearchResult: React.FC<SearchResultProps> = ({title, thumbnail}) => {
  return(
    <div>
      {title}
      <img src={thumbnail} alt='thumbnail'></img>
    </div>
  )
}

export default SearchResult