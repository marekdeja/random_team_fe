import { ReactNode } from 'react'
import buttonStyles from './DeleteButton.module.scss'

interface DeleteButtonProps {
   children: ReactNode
   onClick: () => void
}

const DeleteButton = ({ children, onClick }: DeleteButtonProps) => {
   return (
      <button className={buttonStyles.deleteButton} onClick={onClick}>
         {children}
      </button>
   )
}

export default DeleteButton
