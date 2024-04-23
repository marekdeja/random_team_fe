import React, { useState } from 'react'
import download from 'downloadjs'

import styles from './PickPairs.module.scss'
import MainButton from '@/components/MainButton/MainButton'
import AddButton from '@/components/AddButton/AddButton'
import DeleteButton from '@/components/DeleteButton/DeleteButton'
import ModeHeader from '@/components/ModeHeader/ModeHeader'
import FileLoader from '@/components/FileLoader/FileLoader'

type ResultType = {
   pairs: string[][]
   unpaired: string | undefined
}

const PickPairs = () => {
   const [inputs, setInputs] = useState(['', '', ''])
   const [result, setResult] = useState<ResultType>({ pairs: [], unpaired: '' })
   const [fileName, setFileName] = useState('')
   const [isSaved, setIsSaved] = useState(false)

   const isResultGiven = result.pairs.length || result.unpaired

   const description =
      'Add names manually or load them from a file (.txt, separated by a new line ). Click "Pick pairs" to get random pairs.'

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

   const handlePickPairs = () => {
      const names = [...inputs].filter((name) => name.trim() !== '') // assuming inputs are stored in state
      const pairs = []
      let unpaired

      while (names.length > 1) {
         const randomIndex1 = Math.floor(Math.random() * names.length)
         const name1 = names[randomIndex1]
         names.splice(randomIndex1, 1)

         const randomIndex2 = Math.floor(Math.random() * names.length)
         const name2 = names[randomIndex2]
         names.splice(randomIndex2, 1)

         pairs.push([name1, name2])
      }

      if (names.length === 1) {
         unpaired = names[0]
      }

      setResult({ pairs, unpaired })
   }

   const saveResultToFile = () => {
      const { pairs, unpaired } = result
      let resultStr = ''

      pairs.forEach((pair, index) => {
         resultStr += `Pair ${index + 1}: ${pair[0]} + ${pair[1]}\n`
      })

      if (unpaired) {
         resultStr += `Unpaired: ${unpaired}`
      }

      download(resultStr, 'result.txt', 'text/plain')

      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
   }

   return (
      <div className={styles.container}>
         <ModeHeader title="Pick Pairs" description={description} />

         <div className={styles.columns}>
            <div className={styles.leftColumn}>
               <FileLoader setInputs={setInputs} fileName={fileName} setFileName={setFileName} />
            </div>
            <div className={styles.rightColumn}>
               <button
                  onClick={saveResultToFile}
                  className={styles.saveButton}
                  disabled={!isResultGiven}
               >
                  Save file
               </button>
               <span className={isSaved ? styles.saveText : styles.saveTextHide}>File saved!</span>
            </div>
         </div>

         <div className={styles.columns}>
            <div className={styles.leftColumn}>
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
               <MainButton onClick={handlePickPairs}>Pick pairs</MainButton>
               <div className={styles.itemsNumberText}>
                  Number of items: {inputs.filter((input) => input.trim() !== '').length}
               </div>

               {isResultGiven && (
                  <>
                     {result.unpaired && (
                        <div className={styles.resultUnpaired}>
                           <span className={styles.unpairedLabel}>Unpaired: </span>
                           <span className={styles.unpairedValue}>{result.unpaired}</span>
                        </div>
                     )}
                     <div className={styles.itemsNumberText}>Pairs ({result.pairs.length}):</div>

                     {result.pairs.map((pair, index) => (
                        <div key={index} className={styles.result}>
                           {index + 1}. {pair[0]} - {pair[1]}
                        </div>
                     ))}
                  </>
               )}
            </div>
         </div>
      </div>
   )
}

export default PickPairs
