import React, { useState, useEffect } from 'react'
import { Modal, Toast } from 'react-bootstrap'
import UploadStatusBar from './UploadStatusBar'
import './UploadModal.css'
import photoIcon from '../images/photo-upload-icon.svg'
import button from '../images/button.svg'

interface Props {
  show: boolean,
  onHide: () => void,
  onImageSubmit: (imageUrl: string) => void
}

const UploadModal: React.FC<Props> = ({show, onHide, onImageSubmit}) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>('')
  const [showProgress, setShowProgress] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)

  // const [imgUrl, setImageUrl] = useState<string>('')
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement | null>) => {
    const file: File = (event.target.files as FileList)[0];
    const fileUrl = URL.createObjectURL(file)
    setSelectedFileUrl(fileUrl)

    onImageSubmit(fileUrl)
    setShowProgress(true)
  }

  const onCloseUploadProgress = () => {
    setShowProgress(false)
    setSelectedFileUrl('')
    setUploadComplete(false)
  }

  const onUploadComplete = () => {
   setUploadComplete(true)
  }

  
  return (
      <Modal
        // {...props}
        show={show}
        onHide={onHide}
        onImageSubmit={onImageSubmit}
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
              <label htmlFor='fileItem'>Browse Images</label>
              <input type='file' id="fileItem" onChange={handleFileSelect} style={{display: 'none'}} title=" "/>
            </div> 
          }
            
        </Modal.Body>
        
        <div className='progress-container'>
          { showProgress ?  <UploadStatusBar onCloseUploadProgress={onCloseUploadProgress} onUploadComplete={onUploadComplete}/> : <div className='progress-bar-placeholder'></div>}
        </div>





    </Modal>
  )
}

export default UploadModal