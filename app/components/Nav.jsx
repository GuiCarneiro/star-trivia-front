'use client'
import React, { useState, useEffect } from 'react';
import styles from '../styles/nav.module.scss';

function Nav(){
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    window.addEventListener(
      "message",
      changeInStreak,
      false,
    );
  }, []);

  function changeInStreak(event){
    if(!event.isTrusted)
      return

    if(event.data.event == 'changeInPlayer'){
      if(event.data.streak){
        setStreak(event.data.streak);
      }
    }
  }

  function openModal(){
    window.postMessage({event: 'changeInModal', modalState: true});
  }

  function openStreak(){
    window.postMessage({event: 'changeInModalStreak', modalState: true});
  }

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navHeader}>
          WORDLE HSR
        </div>
      </nav>
      <div className={styles.subNav}>
        <button className={styles.subNavMenu} onClick={openStreak}>
          <img src="/streak.svg"/>

          { 
            streak > 0 && (
              <div className={styles.subNavStreak}>
                {streak}
              </div>
            )
          }
          
        </button>
        
        <button className={styles.subNavMenu} onClick={openModal}>
          <img src="/help.svg"/>
        </button>
      </div>
    </>
  )
}

export default Nav;