'use client'
import styles from '../styles/shareWon.module.scss';
import React, { useState, useEffect } from 'react';

function ShareWon(props){
  const [copyStatus, setCopy] = useState(0);

  function formatGuessesShare(){
    let text = '';
    let tempGuesses = [];

    if(props.guesses.length > 5){
      tempGuesses = props.guesses.slice(props.guesses.length - 5, props.guesses.length);
    }
    else{
      tempGuesses = props.guesses.slice(0, props.guesses.length);
    }

    tempGuesses.reverse().forEach((guess) => {
      text = text + (guess.attributes.path == props.answer[0].attributes.path ? '🟩' : '🟥');
      text = text + (guess.attributes.element == props.answer[0].attributes.element ? '🟩' : '🟥');
      text = text + (guess.attributes.origin == props.answer[0].attributes.origin ? '🟩' : '🟥');

      text = text + '\n';
    });

    if(props.guesses.length > 5){      
      text = text + `➕ ${props.guesses.length - 5} ${props.guesses.length - 5 > 1 ? 'tries' : 'try'}`;
      text = text + '\n';
    }

    text = text + 'hsrdle.net'
    return text;
  }

  async function copyText(){
    let initialData = `I found the #HSRdle character in ${props.guesses.length} ${props.guesses.length > 1 ? 'tries' : 'try'} 🔥\n`;
    var copyText = initialData + formatGuessesShare();

    try {
      await navigator.clipboard.writeText(copyText);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }

    setCopy(1);
    setTimeout(() => {
      setCopy(0)
    }, 2000);
  }

  function shareTwitter(){
    let baseUrl = 'https://twitter.com/intent/tweet?text=';
    let initialData = `I found the #HSRdle character in ${props.guesses.length} ${props.guesses.length > 1 ? 'tries' : 'try'} 🔥\n`;
    let baseData = formatGuessesShare();

    let fullURL = baseUrl + encodeURIComponent(initialData + baseData);

    window.open(fullURL, '_blank').focus();
  }

  return (
    <div className={styles.shareWon}>
      <h2>
        I found the #HSRdle character in {props.guesses.length} {props.guesses.length > 1 ? 'tries' : 'try'} 🔥
      </h2>

      <p id="guess-share">
        {formatGuessesShare()}
      </p>

      <div className={styles.shareButtons}>
        <button className={styles.shareCopyButton} onClick={copyText}>
          <img src="/icon-copy.svg"/>
          Copy
        </button>

        <button className={styles.shareTwitterButton} onClick={shareTwitter}>
          <img src="/twitter.svg"/>
          Share
        </button>
      </div>

      {
        copyStatus != 0 && (
          <div className={styles.copyStatus}>
            Copied successfully!
          </div>
        )
      }
      
    </div>
  )
}

export default ShareWon;