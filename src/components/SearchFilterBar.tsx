import React from 'react'
import { ColorProps } from './Color'
import ColorPalette from './ColorPalette';
import { ColorPaletteProps } from './ColorPalette'
import './SearchFilterBar.css'
import { Button, Accordion, Card } from 'react-bootstrap'


interface SearchFilterProps extends ColorPaletteProps {
  image: string,
  selectedColors: ColorProps[]
  onSearchSubmitCallback: (searchQuery: string, selectedColors: ColorProps[]) => void
}

const SearchFilterBar: React.FC<SearchFilterProps> = ({image, colors, onClickColorCallback, selectedColors, onSearchSubmitCallback}) => {

  return(
    <div className='search-filter-bar'>
      <div className='reference-image-container'>
        { image ? <img src={image} alt='reference' className='reference-image'/> : null }
      </div>
      <div className='filter-label'>FILTER BY</div>
      <div className='filter-label'>Color</div>
      <ColorPalette colors={colors} onClickColorCallback={onClickColorCallback} />

      <div className='filter-label'>CATEGORIES</div>

      <Accordion className='accordian'>
        <Card >
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0" className='category'>
              Living Room
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className='sub-category'>
              <div onClick={() => {onSearchSubmitCallback('sofa', colors)}}>Sofa</div>
              <div>Dining Table</div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1" className='category'>
              Bedroom
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body className='category'>Dresser</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>


    </div>



  )
}

export default SearchFilterBar