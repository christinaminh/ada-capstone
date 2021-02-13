import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import UploadStatusBar from './UploadStatusBar'
import './UploadModal.css'
import photoIcon from '../images/photo-upload-icon.svg'
import button from '../images/button.svg'
import ColorPalette from './ColorPalette';
import { useHistory } from "react-router-dom";

import { ColorPaletteProps } from './ColorPalette'

interface Props extends ColorPaletteProps{
  show: boolean,
  onHide: () => void,
  onImageSubmitCallback: (imageUrl: string) => void,
  // onSearchSubmitCallback: (searchQuery: string) => void,
}

const UploadModal: React.FC<Props> = ({show, onHide, onImageSubmitCallback}) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>('')
  const [showProgress, setShowProgress] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)

  // const [imgUrl, setImageUrl] = useState<string>('')
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement | null>) => {
    const file: File = (event.target.files as FileList)[0];
    const fileUrl = URL.createObjectURL(file)
    setSelectedFileUrl(fileUrl)

    onImageSubmitCallback(fileUrl)
    setShowProgress(true)
  }

  const onCloseUploadProgress = () => {
    setShowProgress(false)
    setSelectedFileUrl('')
    setUploadComplete(false)
  }

  const history = useHistory()

  const onUploadComplete = () => {
    setUploadComplete(true)

    setTimeout( () => {
    // onSearchSubmitCallback('home furniture')

    history.push('/search')
    onHide()
    // setShowProgress(false)
    }, 2000)
  }

  // const history = useHistory()

  // const onQuerySubmit = () => {
  //   history.push('/search')
  //   onSearchSubmitCallback('home furniture')
  //   onHide()
  // }

  const modalFooter = () => {
    if(showProgress) {
      return <UploadStatusBar onCloseUploadProgress={onCloseUploadProgress} onUploadComplete={onUploadComplete}/>
    } else if (!showProgress && !uploadComplete) {
      return <div className='progress-bar-placeholder'></div>
    } 
    // else if (!showProgress && uploadComplete) {
    //   return (
    //     <div>
    //       Click to deselect colors
    //       <ColorPalette colors={colors} onClickColorCallback={onClickColorCallback} />
    //       <button onClick={onQuerySubmit}>Furnie me up!</button>
    //     </div>

    //   )
    }
  // }
  
  return (
      <Modal
        // {...props}
        show={show}
        onHide={onHide}
        onExited={onCloseUploadProgress}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="main-modal"
      
      >
      
        <img src={button} alt='button' className='button' onClick={onHide}/>

        <Modal.Body className={ uploadComplete && selectedFileUrl ? 'image-uploaded' : 'browser' }>

          { selectedFileUrl ? 

          <img src={selectedFileUrl} alt='' className={uploadComplete ? 'uploaded-image': ''}/> 
            : 
            <div className='photo-upload'>
              <img src={photoIcon} alt='upload icon' className='photo-upload-icon'/>
              <label htmlFor='fileItem'>Browse images</label>
              <input type='file' id="fileItem" onChange={handleFileSelect} style={{display: 'none'}} title=" "/>
            </div> 
          }
            
        </Modal.Body>
        

        <div className='progress-container'>
          {modalFooter()}
          {/* { showProgress ?  <UploadStatusBar onCloseUploadProgress={onCloseUploadProgress} onUploadComplete={onUploadComplete}/> : <div className='progress-bar-placeholder'></div>}
          { uploadComplete && !showProgress ? <ColorPalette colors={colors} onClickColorCallback={onClickColorCallback} /> : null} */}

        </div>




    </Modal>
  )
}

export default UploadModal