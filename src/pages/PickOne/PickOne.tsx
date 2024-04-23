import React, { useState } from 'react'

import styles from './PickOne.module.scss'
import MainButton from '@/components/MainButton/MainButton'
import AddButton from '@/components/AddButton/AddButton'
import DeleteButton from '@/components/DeleteButton/DeleteButton'
import ModeHeader from '@/components/ModeHeader/ModeHeader'
import FileLoader from '@/components/FileLoader/FileLoader'

const PickOne = () => {
   const [inputs, setInputs] = useState(['', '', ''])
   const [result, setResult] = useState('')
   const [fileName, setFileName] = useState('')

   const handleAddInput = () => {
      setInputs([...inputs, ''])
   }

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
      const newInputs: string[] = [...inputs]
      newInputs[index] = e.target.value
      setInputs(newInputs)
   }

   const handleDeleteInput = (index: number) => {
      const newInputs = [...inputs]
      newInputs.splice(index, 1)
      setInputs(newInputs)
   }

   const handlePickOne = () => {
      const nonEmptyInputs = inputs.filter((input) => input.trim() !== '')
      if (nonEmptyInputs.length > 0) {
         const randomIndex = Math.floor(Math.random() * nonEmptyInputs.length)
         setResult(nonEmptyInputs[randomIndex])
      }
   }

   const description = `Fill the inputs manually or load them from a file (.txt). The names should be separated by a new line. Click the "Pick one" button to randomly select one of the inputs.`

   return (
      <div className={styles.container}>
         <ModeHeader title="Pick One" description={description} />

         <FileLoader setInputs={setInputs} fileName={fileName} setFileName={setFileName} />

         <div className={styles.columns}>
            <div className={styles.column}>
               {inputs.map((input, index) => (
                  <div key={index} className={styles.inputContainer}>
                     <div className={styles.inputNumber}>{index + 1}</div>
                     <input
                        type="text"
                        value={input}
                        onChange={(e) => handleInputChange(e, index)}
                     />

                     <DeleteButton onClick={() => handleDeleteInput(index)}>-</DeleteButton>
                  </div>
               ))}
               <AddButton onClick={handleAddInput}>+</AddButton>
            </div>
            <div className={styles.rightColumn}>
               <MainButton onClick={handlePickOne}>Pick one</MainButton>
               <div className={styles.itemsNumberText}>
                  Number of items: {inputs.filter((input) => input.trim() !== '').length}
               </div>
               {result && <div>Your result is:</div>}
               <div className={styles.result}>{result}</div>
            </div>
         </div>
      </div>
   )
}

export default PickOne
