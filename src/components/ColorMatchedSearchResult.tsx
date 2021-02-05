import React from 'react'

export interface SearchResultProps {
  // extracted_price: number,
  // link: string,
  // product_link: string,
  // rating: number,
  imageUrl: string,
  // snippet: string,
  title: string
}


const SearchResult: React.FC<SearchResultProps> = ({title, imageUrl}) => {
  return(
    <div>
      {title}
      <img src={imageUrl} alt='thumbnail'></img>
    </div>
  )
}

export default SearchResult