import React, { useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'


export interface SearchParams {
  q: string
}

interface SearchBarProps {
  onSearchSubmitCallback: (searchParams: SearchParams) => void
}

const SearchBar: React.FC<SearchBarProps> = ({onSearchSubmitCallback}) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    q: ''
  })

  const onInputChange = (event: any) => {
    const searchQuery = event.target.value

    const newSearchParams = {
      q: searchQuery,
    }

    setSearchParams(newSearchParams)
  }


  return(
    <div className='search-bar'>
      <InputGroup className='mb-3'>
        <FormControl
          onChange={onInputChange}
          value={searchParams.q}
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
        />

        <InputGroup.Append>
          <Button onClick={() => onSearchSubmitCallback(searchParams)}variant="outline-secondary">FIND MATCHES</Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  )
}

export default SearchBar