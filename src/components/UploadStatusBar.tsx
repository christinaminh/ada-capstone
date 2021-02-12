import React, { useState, useEffect } from 'react'
import ProgressBar from './ProgressBar'
import deleteButton from '../images/delete.svg'
import uploadCompleteIcon from '../images/upload-complete.svg'

interface StatusBarProps {
  onCloseUploadProgress: () => void
  onUploadComplete: () => void
}

const UploadStatusBar: React.FC<StatusBarProps> = ({onCloseUploadProgress, onUploadComplete}) => {
  const [progressValue, setProgressValue] = useState(0)
  const [showProgressBar, setShowProgressBar] = useState(true)
  

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue((oldValue) => {
        const newValue = oldValue + 50

        if (newValue === 100) {
          clearInterval(interval)
          setShowProgressBar(false)
          onUploadComplete()
        }
        return newValue
      })
    }, 1000)

    
  }, [onUploadComplete])

  // const showUploading = () => {

  //   if (progressValue >= 100) {
  //     return (
  //       <div>Complete</div>
  //     )
  //   } else {
  //     return (
  //       <div onClick={() => {onCloseUploadProgress()}}>
  //       <ProgressBar value={progressValue}/>
  //       </div>
  //     )
  //   }
  // // }
  // if (progressValue >= 100) {
  //   setShowProgress(false)
  // }
  
    

  return(
    <div className='progress-bar-container'>
    { showProgressBar ? 
      <div>
        <div className='upload-bar-header'>
          Uploading
          <img src={deleteButton} alt='close' className='upload-icon' onClick={() => {onCloseUploadProgress()}}/>
        </div>
        <ProgressBar value={progressValue}/>
      </div> 

      : <div className='upload-bar-header'>
          Complete
          <img src={uploadCompleteIcon} alt='complete icon' className='upload-icon'/>
        </div>}
    </div>
  )
}

export default UploadStatusBar