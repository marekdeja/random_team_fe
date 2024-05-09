import React, { useState } from 'react'
import download from 'downloadjs'

import styles from './PickTeams.module.scss'
import MainButton from '@/components/MainButton/MainButton'
import AddButton from '@/components/AddButton/AddButton'
import DeleteButton from '@/components/DeleteButton/DeleteButton'
import ModeHeader from '@/components/ModeHeader/ModeHeader'
import FileLoader from '@/components/FileLoader/FileLoader'

const PickTeams = () => {
   const [inputs, setInputs] = useState(['', '', ''])
   const [result, setResult] = useState<string[][]>([])
   const [fileName, setFileName] = useState('')
   const [isSaved, setIsSaved] = useState(false)
   const [createBy, setCreateBy] = useState('teams')
   const [userNumber, setUserNumber] = useState(2)

   const isResultGiven = result.length > 0

   const description =
      'Add names manually or load them from a file (.txt, separated by a new line ). Set a number of teams you want or how many people per team. Click "Pick teams" to get random teams.'

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

   const handlePickTeams = () => {
      const filteredInputs = inputs.filter((input) => input.trim() !== '')
      const shuffledInputs = [...filteredInputs].sort(() => Math.random() - 0.5)

      if (filteredInputs.length === 0) {
         return
      }

      let result: string[][] = []

      if (createBy === 'teams') {
         const teamSize = Math.ceil(shuffledInputs.length / userNumber)
         result = Array.from({ length: userNumber }, (_, i) =>
            shuffledInputs.slice(i * teamSize, i * teamSize + teamSize),
         )
      } else if (createBy === 'members') {
         result = Array.from({ length: Math.ceil(shuffledInputs.length / userNumber) }, (_, i) =>
            shuffledInputs.slice(i * userNumber, (i + 1) * userNumber),
         )
      }
      console.log(result)
      setResult(result)
   }

   const saveResultToFile = () => {
      let resultStr = ''

      result.forEach((team, index) => {
         resultStr += `Team ${index + 1} (${team.length}):\n`
         team.forEach((member, index) => {
            resultStr += `${index + 1}. ${member}\n`
         })
         resultStr += '\n'
      })

      download(resultStr, 'result.txt', 'text/plain')

      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2000)
   }

   const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCreateBy(e.target.value)
   }

   const handleUserNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserNumber(Number(e.target.value))
   }

   return (
      <div className={styles.container}>
         <ModeHeader title="Pick Teams" description={description} />

         <div className={styles.columnsTop}>
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
               <MainButton onClick={handlePickTeams}>Pick teams</MainButton>
               <div className={styles.itemsNumberText}>
                  Number of all items: {inputs.filter((input) => input.trim() !== '').length}
               </div>

               <div className={styles.userNumber}>
                  I want to have{' '}
                  <input
                     type="number"
                     value={userNumber}
                     onChange={(e) => handleUserNumberChange(e)}
                     className={styles.userNumberInput}
                  />
               </div>
               <div className={styles.radioContainer}>
                  <div>
                     <input
                        type="radio"
                        id="teams"
                        name="createBy"
                        value="teams"
                        checked={createBy === 'teams'}
                        onChange={handleRadioChange}
                     />
                     <label htmlFor="teams">Teams</label>
                  </div>
                  <div>
                     <input
                        type="radio"
                        id="members"
                        name="createBy"
                        value="members"
                        checked={createBy === 'members'}
                        onChange={handleRadioChange}
                     />
                     <label htmlFor="members">Members per team</label>
                  </div>
               </div>

               {isResultGiven && (
                  <>
                     {result.map((_, index) => (
                        <div key={index}>
                           <div className={styles.teamTitle}>
                              Team {index + 1} ({result[index].length})
                           </div>
                           <div key={index} className={styles.result}>
                              {result[index].map((item, index) => (
                                 <div key={index} className={styles.resultItem}>
                                    {index + 1}. {item}
                                 </div>
                              ))}
                           </div>
                        </div>
                     ))}
                  </>
               )}
            </div>
         </div>
      </div>
   )
}

export default PickTeams
