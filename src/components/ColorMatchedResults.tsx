import React from "react";
import { SearchResultProps } from './ColorMatchedSearchResult'
import ColorMatchedSearchResult from './ColorMatchedSearchResult';

interface ResultsToRenderProps {
  resultsToRender: SearchResultProps[]
}

const ColorMatchedResults:React.FC<ResultsToRenderProps> = ({ resultsToRender }) => {
  return (
    <div className='search-results'>
      {resultsToRender.map((item, i) => (
        <ColorMatchedSearchResult key={i} title={item.title} imageUrl={item.imageUrl} price={item.price} link={item.link}/>
        ))
      }
    </div>
  );
};
export default ColorMatchedResults;