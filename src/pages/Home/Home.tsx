import styles from './Home.module.scss'
import { useNavigate } from 'react-router-dom'

import pickOneImage from '@/assets/pickOneThumb.png'
import pickPairsImage from '@/assets/pickPairsThumb.png'
import pickTeamsImage from '@/assets/pickTeamsThumb.png'
import pickPairsListsImage from '@/assets/pickPairsListsThumb.png'

const Home = () => {
   const navigate = useNavigate()

   const options = [
      { id: 1, title: 'Pick One', text: 'Pick one random item from a list.', image: pickOneImage },
      {
         id: 2,
         title: 'Pick Pairs',
         text: 'Create random pairs from a list.',
         image: pickPairsImage,
      },
      {
         id: 3,
         title: 'Pick Teams',
         text: 'Create random teams from a list. Specify the number of teams or members per team.',
         image: pickTeamsImage,
      },
      {
         id: 4,
         title: 'Pick Pairs from Two Lists',
         text: 'Create random pairs from two custom lists.',
         image: pickPairsListsImage,
      },
   ]

   const handleButtonClick = (optionId: number) => {
      if (optionId === 1) {
         navigate('/pick-one')
      }
      if (optionId === 2) {
         navigate('/pick-pairs')
      }
      if (optionId === 3) {
         navigate('/pick-teams')
      }
      if (optionId === 4) {
         navigate('/two-lists')
      }
   }

   return (
      <div className={styles.container}>
         {options.map((option) => (
            <div key={option.id} className={styles.option}>
               <div className={styles.optionTop}>
                  <button onClick={() => handleButtonClick(option.id)}>{option.title}</button>
                  <div className={styles.optionText}>{option.text}</div>
               </div>
               {option.image && <img src={option.image} alt={option.text} />}
               <div className={styles.optionBottom}>
                  <hr />
               </div>
            </div>
         ))}
      </div>
   )
}

export default Home
