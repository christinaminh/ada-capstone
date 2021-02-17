import React from 'react'
import { ColorProps } from './Color'
import ColorPalette from './ColorPalette';
import { ColorPaletteProps } from './ColorPalette'
import './SearchFilterBar.css'
import { Button, Accordion, Card } from 'react-bootstrap'


interface SearchFilterProps extends ColorPaletteProps {
  image: string,
  selectedColors: ColorProps[]
  // onSearchSubmitCallback?: (searchQuery: string, selectedColors: ColorProps[]) => void
  setSearchQuery: (arg0: string) => void
}

const SearchFilterBar: React.FC<SearchFilterProps> = ({image, colors, onClickColorCallback, selectedColors, setSearchQuery}) => {

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
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0" className='category'>
              Bedroom
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className='sub-category'>
              <div onClick={() => {setSearchQuery('bedframe')}}>Bedframes</div>
              <div onClick={() => {setSearchQuery('bedding')}}>Bedding</div>
              <div onClick={() => {setSearchQuery('nightstand')}}>Nightstands</div>
              <div onClick={() => {setSearchQuery('lamp')}}>Lamps</div>
              <div onClick={() => {setSearchQuery('dresser')}}>Dressers</div>
              <div onClick={() => {setSearchQuery('bedroom storage organization')}}>Storage and Organization</div>
              <div onClick={() => {setSearchQuery('desk')}}>Desks</div>
              <div onClick={() => {setSearchQuery('rug')}}>Rugs</div>
            </Card.Body>

          </Accordion.Collapse>
        </Card>


        <Card >
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1" className='category'>
              Living Room
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body className='sub-category'>
              <div onClick={() => {setSearchQuery('sofa couch')}}>Sofas</div>
              <div onClick={() => {setSearchQuery('armchair')}}>Armchairs</div>
              <div onClick={() => {setSearchQuery('throw blanket')}}>Throw Blankets</div>
              <div onClick={() => {setSearchQuery('coffee table')}}>Coffee Tables</div>
              <div onClick={() => {setSearchQuery('side table')}}>Side Tables</div>
              <div onClick={() => {setSearchQuery('media furniture')}}>Media Furniture</div>
              <div onClick={() => {setSearchQuery('bookcase shelving')}}>Shelving Units</div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card >
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2" className='category'>
              Kitchen and Dining
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body className='sub-category'>
              <div onClick={() => {setSearchQuery('dining table')}}>Dining Tables</div>
              <div onClick={() => {setSearchQuery('dining chair')}}>Dining Chairs</div>
              <div onClick={() => {setSearchQuery('dining set')}}>Dining Sets</div>
              <div onClick={() => {setSearchQuery('dining stool bench')}}>Stools and Benches</div>
              <div onClick={() => {setSearchQuery('cookware')}}>Cookware</div>
              <div onClick={() => {setSearchQuery('tableware')}}>Tableware</div>
              <div onClick={() => {setSearchQuery('kitchen storage')}}>Storage and Organization</div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="3" className='category'>
              Bathroom
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body className='sub-category'>
              <div onClick={() => {setSearchQuery('bathroom accessories')}}>Bathroom Accessories</div>
              <div onClick={() => {setSearchQuery('towel')}}>Towels</div>
              <div onClick={() => {setSearchQuery('bathroom storage')}}>Storage and Organization</div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>


    </div>



  )
}

export default SearchFilterBar