import styles from './styles/index.module.scss';
import Link from 'next/link';

function IndexPage() {
  return (
    <div className={styles.mainMenu}>
      <Link
        href="/classic"
        className={styles.menuLink}
      > 
        <div className={styles.menuButton}>
          <div className={styles.menuTitle}>
            Classic
          </div>

          <div className={styles.menuDescription}>
            Get clues and guess a character
          </div>
        </div>
      </Link>

      <Link
        href="/quotes"
        className={styles.menuLink}
      > 
        <div className={styles.menuButton}>
          <div className={styles.menuTitle}>
            Quotes
          </div>

          <div className={styles.menuDescription}>
            Guess with in-game quotes
          </div>
        </div>
      </Link>
    </div>
  )
}

export const metadata = {
  title: 'Redux Toolkit',
}


export default IndexPage
