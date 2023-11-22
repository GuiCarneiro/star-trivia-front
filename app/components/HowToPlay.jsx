import styles from '../styles/howToPlay.module.scss';
import React, { useState, useEffect } from 'react';
import Countdown from './Countdown';

function HowToPlay(){
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

    if(event.data.event == 'changeInModal'){
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
      <div className={styles.howToPlayModal} data-open={isOpen ? true : null}>
        <div className={styles.modalHeader}>
          <img src="/helpModal.svg"/>
          How to play?
        </div>

        <p>
          Guess today's Honkai: Star Rail character. It will change every 24h.
        </p>

        <div className={styles.countDownBlock}>
          <div className={styles.nextCharIn}>
            Next character in
          </div>
          <Countdown />
        </div>

        <p>
          Enter the characters name to reveal their properties. 
          The square colors change to show if the properties are right. 
          <span className={styles.green}> Green</span> meaning right and 
          <span className={styles.red}> Red</span> meaning wrong.
        </p>

        <img src='./howToIllustration.png' className={styles.howToPlayIllustration}/>

        <div className={styles.divider} />

        <h2>
          Properties
        </h2>

        <div className={styles.block}>
          <h3>
            Paths
          </h3>
          <p>
            Destruction, The Hunt, Erudition, Harmony, Nihility, Preservation, Abundance.
          </p>
        </div>

        <div className={styles.block}>
          <h3>
            Elements
          </h3>
          <p>
            Physical, Fire, Ice, Lightning, Wind, Quantum, Imaginary.
          </p>
        </div>

        <div className={styles.block}>
          <h3>
            Origins
          </h3>
          <p>
            Belobog, Xianzhou, Astral Express ...
          </p>
        </div>

        <div className={styles.divider} />

        <div className={styles.goodLuck}>
          Good luck and have fun!
        </div>
      </div>
    </>
  )
}

export default HowToPlay;