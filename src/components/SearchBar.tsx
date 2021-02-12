import React, { useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'


// export interface SearchParams {
//   q: string
// }

// interface SearchBarProps {
//   onSearchSubmitCallback: (searchParams: SearchParams) => void
// }

  
export interface SearchBarProps {
  onSearchSubmitCallback: (searchQuery: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({onSearchSubmitCallback}) => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const onInputChange = (event: any) => {
    const newSearchQuery = event.target.value

    // const newSearchParams = {
    //   q: searchQuery,
    // }

    setSearchQuery(newSearchQuery)
  }


  return(
    <div className='search-bar'>
      <InputGroup className='mb-3'>
        <FormControl
          onChange={onInputChange}
          value={searchQuery}
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
          className='search-bar'
        />

        <InputGroup.Append>
          <Button onClick={() => onSearchSubmitCallback(searchQuery)} className='search-button'>FIND MATCHES</Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  )
}

export default SearchBar