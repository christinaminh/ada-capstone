import React from 'react'

export interface SearchResultProps {
  link: string,
  imageUrl: string,
  title: string,
  price: number
}


const SearchResult: React.FC<SearchResultProps> = ({title, imageUrl, price, link}) => {
  return(
    <div className='search-result-card'>
      <div className='product-image-container'>
        <img src={imageUrl} alt='thumbnail' className='product-image'/>
      </div>
      <div className='product-title-container'>
        <p className='product-title'>{title}</p>
      </div>

      <div>TODO: FIX PRICE{price}</div>

      <a href={link} className='shop-button'>Shop</a>
    </div>
  )
}

export default SearchResult