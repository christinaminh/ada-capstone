import React from 'react'
import SearchFilterBar from './SearchFilterBar'
import { ColorPaletteProps } from './ColorPalette'
import { InspirationBarProps } from './InspirationBar';
import SearchBar from './SearchBar'
import { SearchBarProps } from './SearchBar'
import { SearchResultProps } from './ColorMatchedSearchResult'
import ColorMatchedSearchResult from './ColorMatchedSearchResult';
import './SearchPageLayout.css'
import Header from './Header'

interface SearchPageProps extends InspirationBarProps, SearchBarProps, ColorPaletteProps{
  colorMatchedResults: SearchResultProps[]
  setUploadModalShow: () => void
}


const SearchPageLayout: React.FC<SearchPageProps> = ({image, colors, colorMatchedResults, onClickColorCallback, onSearchSubmitCallback, setUploadModalShow}) => {


return (
  <div className='search-page'>
    <div className='search-header'>
      <Header />
      <button className='upload-button'onClick={setUploadModalShow}>
        Upload a photo
      </button>
    </div>

    

    <SearchFilterBar 
      colors={colors} 
      onClickColorCallback={onClickColorCallback}         
      image={image} 
    />


    <SearchBar onSearchSubmitCallback={onSearchSubmitCallback}/>


    <div className='search-results-container'>
      { (colorMatchedResults as SearchResultProps[]).map( ( (item, i) => (
          <ColorMatchedSearchResult key={i} title={item.title} imageUrl={item.imageUrl} price={item.price} link={item.link}/>
        )))}
    </div>
        

        
    {/* <Footer /> */}



  </div>
)
}

export default SearchPageLayout