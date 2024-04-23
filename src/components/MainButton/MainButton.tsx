import { ReactNode } from 'react'
import buttonStyles from './MainButton.module.scss'

interface MainButtonProps {
   children: ReactNode
   onClick: () => void
}

const MainButton = ({ children, onClick }: MainButtonProps) => {
   return (
      <button className={buttonStyles.mainButton} onClick={onClick}>
         {children}
      </button>
   )
}

export default MainButton
