import pageStyles from 'components/Page/Page.module.scss'
import { useNavigate } from 'react-router-dom'
import linkedInIcon from '@/assets/linkedin_icon.svg'

interface PageProps {
   children: React.ReactNode | React.ReactNode[]
}

const Page = ({ children }: PageProps) => {
   const navigate = useNavigate()
   const handleTitleClick = () => {
      navigate('/')
   }
   return (
      <div className={pageStyles.page}>
         <header>
            <div className={pageStyles.webSite}>
               <a href="https://marekdeja.com" target="_blank" rel="noopener noreferrer">
                  marekdeja.com
               </a>
            </div>
            <div className={pageStyles.title} onClick={handleTitleClick}>
               <span className={pageStyles.firstLetterTitle}>R</span>andom
               <span className={pageStyles.firstLetterTitle}>T</span>eam
            </div>
            {/* <div className={pageStyles.linkedInSection}>
               <div className={pageStyles.createdBy}>
                  <a
                     href="https://www.linkedin.com/in/marekdeja/"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     by Marek Deja
                  </a>
               </div>
               <a
                  href="https://www.linkedin.com/in/marekdeja/"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  <img src={linkedInIcon} alt="LinkedIn Profile" height="20px" />
               </a>
            </div> */}
         </header>
         <main>{children}</main>
      </div>
   )
}

export default Page
