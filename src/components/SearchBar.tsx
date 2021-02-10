import React, { useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'


// export interface SearchParams {
//   q: string
// }

// interface SearchBarProps {
//   onSearchSubmitCallback: (searchParams: SearchParams) => void
// }

  
  interface SearchBarProps {
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
        />

        <InputGroup.Append>
          <Button onClick={() => onSearchSubmitCallback(searchQuery)}variant="outline-secondary">FIND MATCHES</Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  )
}

export default SearchBar