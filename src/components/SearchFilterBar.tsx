import React from 'react'
import { ColorProps } from './Color'
import ColorPalette from './ColorPalette';
import { ColorPaletteProps } from './ColorPalette'
import './SearchFilterBar.css'
import { Button, Accordion, Card } from 'react-bootstrap'


interface SearchFilterProps extends ColorPaletteProps {
  image: string,
  // selectedColors: ColorProps[]
  // onSearchSubmitCallback?: (searchQuery: string, selectedColors: ColorProps[]) => void
  setSearchQuery: (arg0: string) => void
  resetSearch: () => void
}

const SearchFilterBar: React.FC<SearchFilterProps> = ({image, colors, onClickColorCallback, setSearchQuery, resetSearch}) => {

  const onSelectCategory = ( searchQuery: string) => {
    resetSearch()

    setSearchQuery(searchQuery)
  }
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
              <div onClick={() => {onSelectCategory('bedframe')}}>Bedframes</div>
              <div onClick={() => {onSelectCategory('bedding')}}>Bedding</div>
              <div onClick={() => {onSelectCategory('nightstand')}}>Nightstands</div>
              <div onClick={() => {onSelectCategory('lamp')}}>Lamps</div>
              <div onClick={() => {onSelectCategory('dresser')}}>Dressers</div>
              <div onClick={() => {onSelectCategory('bedroom storage organization')}}>Storage and Organization</div>
              <div onClick={() => {onSelectCategory('desk')}}>Desks</div>
              <div onClick={() => {onSelectCategory('rug')}}>Rugs</div>
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
              <div onClick={() => {onSelectCategory('sofa couch')}}>Sofas</div>
              <div onClick={() => {onSelectCategory('armchair')}}>Armchairs</div>
              <div onClick={() => {onSelectCategory('throw blanket')}}>Throw Blankets</div>
              <div onClick={() => {onSelectCategory('coffee table')}}>Coffee Tables</div>
              <div onClick={() => {onSelectCategory('side table')}}>Side Tables</div>
              <div onClick={() => {onSelectCategory('bookcase shelving')}}>Shelving Units</div>
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
              <div onClick={() => {onSelectCategory('dining table')}}>Dining Tables</div>
              <div onClick={() => {onSelectCategory('dining chair')}}>Dining Chairs</div>
              <div onClick={() => {onSelectCategory('dining set')}}>Dining Sets</div>
              <div onClick={() => {onSelectCategory('dining stool bench')}}>Stools and Benches</div>
              <div onClick={() => {onSelectCategory('cookware')}}>Cookware</div>
              <div onClick={() => {onSelectCategory('tableware')}}>Tableware</div>
              <div onClick={() => {onSelectCategory('kitchen storage')}}>Storage and Organization</div>
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
              <div onClick={() => {onSelectCategory('bathroom accessories')}}>Bathroom Accessories</div>
              <div onClick={() => {onSelectCategory('towel')}}>Towels</div>
              <div onClick={() => {onSelectCategory('bathroom storage')}}>Storage and Organization</div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>


    </div>



  )
}

export default SearchFilterBar