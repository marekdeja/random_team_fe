import React, { useState } from 'react'
import download from 'downloadjs'

import styles from './TwoLists.module.scss'
import MainButton from '@/components/MainButton/MainButton'
import AddButton from '@/components/AddButton/AddButton'
import DeleteButton from '@/components/DeleteButton/DeleteButton'
import ModeHeader from '@/components/ModeHeader/ModeHeader'
import FileLoader from '@/components/FileLoader/FileLoader'

type ResultType = {
   pairs: string[][]
   unpaired: string[]
}

const TwoLists = () => {
   const [inputsListOne, setInputsListOne] = useState(['', '', ''])
   const [inputsListTwo, setInputsListTwo] = useState(['', '', ''])
   const [result, setResult] = useState<ResultType>({ pairs: [], unpaired: [] })
   const [fileNameOne, setFileNameOne] = useState('')
   const [fileNameTwo, setFileNameTwo] = useState('')
   const [isSaved, setIsSaved] = useState(false)

   const isPairedResult = result.pairs.length > 0
   const isUnpairedResult = result.unpaired.length > 0
   const isResultGiven = isPairedResult || isUnpairedResult

   const description =
      'Add names manually or load them from a file (.txt, separated by a new line ). Click "Pick pairs" to get random pairs.'

   const handleAddInput = (
      inputs: string[],
      setInputs: React.Dispatch<React.SetStateAction<string[]>>,
   ) => {
      setInputs([...inputs, ''])
   }

   const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number,
      inputs: string[],
      setInputs: React.Dispatch<React.SetStateAction<string[]>>,
   ): void => {
      const newInputs: string[] = [...inputs]
      newInputs[index] = e.target.value
      setInputs(newInputs)
   }

   const handleDeleteInput = (
      index: number,
      inputs: string[],
      setInputs: React.Dispatch<React.SetStateAction<string[]>>,
   ) => {
      const newInputs = [...inputs]
      newInputs.splice(index, 1)
      setInputs(newInputs)
   }

   const handleTwoLists = () => {
      const shuffle = (array: string[]) => {
         return array.sort(() => Math.random() - 0.5)
      }

      const shuffledList1 = shuffle(inputsListOne.filter((input) => input.trim() !== ''))
      const shuffledList2 = shuffle(inputsListTwo.filter((input) => input.trim() !== ''))

      const pairs: string[][] = []
      const unpaired: string[] = []

      const maxLength = Math.max(shuffledList1.length, shuffledList2.length)

      for (let i = 0; i < maxLength; i++) {
         if (shuffledList1[i] && shuffledList2[i]) {
            pairs.push([shuffledList1[i], shuffledList2[i]])
         } else if (shuffledList1[i]) {
            unpaired.push(shuffledList1[i])
         } else if (shuffledList2[i]) {
            unpaired.push(shuffledList2[i])
         }
      }

      return setResult({ pairs, unpaired })
   }

   const saveResultToFile = () => {
      const { pairs, unpaired } = result
      let resultStr = ''

      isPairedResult &&
         pairs.forEach((pair, index) => {
            resultStr += `Pair ${index + 1}: ${pair[0]} + ${pair[1]}\n`
         })

      resultStr += '\n'

      isUnpairedResult &&
         unpaired.forEach((name, index) => {
            resultStr += `Unpaired ${index + 1}: ${name}\n`
         })

      download(resultStr, 'result.txt', 'text/plain')

      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
   }

   return (
      <div className={styles.container}>
         <ModeHeader title="Pick Pairs from Two Lists" description={description} />

         <div className={styles.columns}>
            <div className={styles.leftColumnLists}>
               <div className={styles.inputList}>
                  <div className={styles.listTitle}>
                     List 1 ({inputsListOne.filter((input) => input.trim() !== '').length})
                  </div>
                  <div className={styles.fileLoaderWrapper}>
                     <FileLoader
                        setInputs={setInputsListOne}
                        fileName={fileNameOne}
                        setFileName={setFileNameOne}
                     />
                  </div>
                  {inputsListOne.map((input, index) => (
                     <div key={index} className={styles.inputContainer}>
                        <div className={styles.inputNumber}>{index + 1}</div>
                        <input
                           type="text"
                           value={input}
                           onChange={(e) =>
                              handleInputChange(e, index, inputsListOne, setInputsListOne)
                           }
                        />

                        <DeleteButton
                           onClick={() => handleDeleteInput(index, inputsListOne, setInputsListOne)}
                        >
                           -
                        </DeleteButton>
                     </div>
                  ))}
                  <AddButton onClick={() => handleAddInput(inputsListOne, setInputsListOne)}>
                     +
                  </AddButton>
               </div>

               <div className={styles.inputList}>
                  <div className={styles.listTitle}>
                     List 2 ({inputsListTwo.filter((input) => input.trim() !== '').length})
                  </div>
                  <div className={styles.fileLoaderWrapper}>
                     <FileLoader
                        setInputs={setInputsListTwo}
                        fileName={fileNameTwo}
                        setFileName={setFileNameTwo}
                        id="fileInputTwo"
                     />
                  </div>

                  {inputsListTwo.map((input, index) => (
                     <div key={index} className={styles.inputContainer}>
                        <div className={styles.inputNumber}>{index + 1}</div>
                        <input
                           type="text"
                           value={input}
                           onChange={(e) =>
                              handleInputChange(e, index, inputsListTwo, setInputsListTwo)
                           }
                        />

                        <DeleteButton
                           onClick={() => handleDeleteInput(index, inputsListTwo, setInputsListTwo)}
                        >
                           -
                        </DeleteButton>
                     </div>
                  ))}
                  <AddButton onClick={() => handleAddInput(inputsListTwo, setInputsListTwo)}>
                     +
                  </AddButton>
               </div>
            </div>
            <div className={styles.rightColumn}>
               <div>
                  <button
                     onClick={saveResultToFile}
                     className={styles.saveButton}
                     disabled={!isResultGiven}
                  >
                     Save file
                  </button>
                  <span className={isSaved ? styles.saveText : styles.saveTextHide}>
                     File saved!
                  </span>
               </div>

               <MainButton onClick={() => handleTwoLists()}>Pick pairs</MainButton>

               {isResultGiven && (
                  <>
                     <div className={styles.itemsNumberText}>
                        Unpaired ({result.unpaired.length}):
                        {isUnpairedResult
                           ? result.unpaired.map((name, index) => (
                                <div key={index} className={styles.resultUnpaired}>
                                   {name}
                                </div>
                             ))
                           : '-'}
                     </div>
                     <div className={styles.itemsNumberText}>
                        Pairs ({result.pairs.length}):
                        {result.pairs.map((pair, index) => (
                           <div key={index} className={styles.result}>
                              {index + 1}. {pair[0]} - {pair[1]}
                           </div>
                        ))}
                     </div>
                  </>
               )}
            </div>
         </div>
      </div>
   )
}

export default TwoLists
