'use client'
import React, { useState, useEffect } from 'react';
import styles from '../styles/nav.module.scss';
import amplitude from 'amplitude-js';

function Nav(){
  const [streak, setStreak] = useState(0);
  var amplitudeInstance = amplitude.getInstance().init('96bc3a35921a2e1d2d4adc893e7a5217');

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
    amplitude.getInstance().logEvent('user-opened-how-to-play');
  }

  function openStreak(){
    window.postMessage({event: 'changeInModalStreak', modalState: true});
    amplitude.getInstance().logEvent('user-opened-streak');
  }

  return(
    <>
      <nav className={styles.nav}>
        <div className={styles.navHeader}>
          <img src="./logoHeader.svg"/>
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