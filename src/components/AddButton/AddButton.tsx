import { ReactNode } from 'react'
import buttonStyles from './AddButton.module.scss'

interface AddButtonProps {
   children: ReactNode
   onClick: () => void
}

const AddButton = ({ children, onClick }: AddButtonProps) => {
   return (
      <button className={buttonStyles.addButton} onClick={onClick}>
         {children}
      </button>
   )
}

export default AddButton
