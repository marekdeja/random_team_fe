import React from 'react'
import styles from './FileLoader.module.scss'

type FileInputProps = {
   id?: string
   setInputs: React.Dispatch<React.SetStateAction<string[]>>
   fileName: string
   setFileName: React.Dispatch<React.SetStateAction<string>>
}

const FileLoader: React.FC<FileInputProps> = ({
   id = 'fileInput',
   setInputs,
   fileName,
   setFileName,
}) => {
   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
         const reader = new FileReader()
         reader.onload = (event) => {
            const names = (event.target?.result as string).split('\r\n')
            setInputs(names)
         }
         reader.readAsText(file)
         setFileName(file.name)
      }
      e.target.value = ''
   }

   return (
      <>
         <input
            type="file"
            id={id}
            accept=".txt"
            onChange={handleFileChange}
            style={{ display: 'none' }}
         />
         <label htmlFor={id} className={styles.customFileInput}>
            {(fileName && 'Loaded: ' + fileName) || 'Load from a file ...'}{' '}
         </label>
      </>
   )
}

export default FileLoader
