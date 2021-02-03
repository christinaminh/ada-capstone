import React, { useState } from 'react'

interface Props {
  onImageSubmit: (imageUrl: string) => void
}

const Upload: React.FC<Props> = ({onImageSubmit}) => {

  
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | undefined>('')

  const [imgUrl, setImageUrl] = useState<string>('')


  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement | null>) => {
    const file: File = (event.target.files as FileList)[0];
    const fileUrl = URL.createObjectURL(file)
    setSelectedFileUrl(fileUrl)

    // Convert file to base64 string
    const reader = new FileReader()
    reader.readAsDataURL(file); 
    reader.onloadend = () => {
        const base64Data = reader.result
        const trimmedBase64Url = (base64Data as string).replace('data:image/jpeg;base64,','')  

        setImageUrl(trimmedBase64Url);
    }    
  }


  return (
    <div>
      <input type='file' id="fileItem" onChange={handleFileSelect}  ></input>
      <img src={selectedFileUrl} alt=''></img>
      <button onClick={() => onImageSubmit(imgUrl)}>Submit Image</button>
    </div>
  )
}

export default Upload