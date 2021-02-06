import React, { useState } from 'react'

interface Props {
  onImageSubmit: (imageUrl: string) => void
}

const Upload: React.FC<Props> = ({onImageSubmit}) => {
  
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>('')

  // const [imgUrl, setImageUrl] = useState<string>('')


  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement | null>) => {
    const file: File = (event.target.files as FileList)[0];
    const fileUrl = URL.createObjectURL(file)
    setSelectedFileUrl(fileUrl)
    
    // // Convert file to base64 string
    // const reader = new FileReader()
    // reader.readAsDataURL(file); 
    // reader.onloadend = () => {
    //   const base64Data = reader.result
    //   const trimmedBase64Url = (base64Data as string).replace('data:image/jpeg;base64,','')  

    //   setImageUrl(trimmedBase64Url);

        
    // }

    // function encodeImageFileAsURL(element) {
    //   var file = element.files[0];
    //   var reader = new FileReader();
    //   reader.onloadend = function() {
    //     console.log('RESULT', reader.result)
    //   }
    //   reader.readAsDataURL(file);
    // }
  }


  return (
    <div>
      <input type='file' id="fileItem" onChange={handleFileSelect}  ></input>
      { selectedFileUrl ? <img src={selectedFileUrl} alt=''/> : null }
      <button onClick={() => onImageSubmit(selectedFileUrl)}>Extract Colors</button>
    </div>
  )
}

export default Upload