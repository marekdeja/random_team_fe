import { useNavigate } from 'react-router-dom'
import styles from './ModeHeader.module.scss'

interface ModeHeaderProps {
   title: string
   description: string
   isTwoLists?: boolean
}

const ModeHeader = ({ title, description, isTwoLists }: ModeHeaderProps) => {
   const navigate = useNavigate()

   return (
      <>
         <div className={styles.header}>
            <button
               className={` ${isTwoLists ? styles.backButtonTwoLists : styles.backButton}`}
               onClick={() => navigate(-1)}
            >
               Back
            </button>
            <div className={styles.title}>{title}</div>
         </div>
         <div className={styles.description}>{description}</div>
      </>
   )
}

export default ModeHeader
