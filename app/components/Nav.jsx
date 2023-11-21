'use client'
import styles from '../styles/nav.module.scss';

function Nav(){
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navHeader}>
          WORDLE HSR
        </div>
      </nav>
      <div className={styles.subNav}>
        <button className={styles.subNavMenu}>
          <img src="/streak.svg"/>
        </button>
        
        <button className={styles.subNavMenu}>
          <img src="/help.svg"/>
        </button>
      </div>
    </>
  )
}

export default Nav;