import styles from '../styles/streakModal.module.scss';
import React, { useState, useEffect } from 'react';

function StreakModal(){
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "message",
      changeIsOpen,
      false,
    );
  }, []);

  function changeIsOpen(event){
    if(!event.isTrusted)
      return

    if(event.data.event == 'changeInModalStreak'){
      setIsOpen(event.data.modalState);
    }
  }

  return (
    <>
      <div className={styles.modalBackground} data-open={isOpen ? true : null}/>
      <button className={styles.modalClose} 
        onClick={() => {setIsOpen(false)}}
        data-open={isOpen ? true : null}
      >
        <img src="./closeModal.svg" />
      </button>
      <div className={styles.streakModal} data-open={isOpen ? true : null}>
        <div className={styles.modalHeader}>
          <img src="/streakModal.svg"/>
          What is my streak?
        </div>

        <p>
          Whenever you come back and play HSRdle you add to your streak.
        </p>

        <p>
          Make sure to come back and play to keep your streak!
        </p>

        <img src="./streakIllustration.png" className={styles.streakIllustration} />
      </div>
    </>
  )
}

export default StreakModal;