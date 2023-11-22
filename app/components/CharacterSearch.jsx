'use client'
import React, { useState, useEffect } from 'react';
import styles from '../styles/characterSearch.module.scss';

function CharacterSearch(props){
  const [inputState, setInput] = useState('');

  function changeInputState(e){
    setInput(e.target.value);
  }

  return (
    <div className={styles.characterSearch}>
      <h1>
        Guess <span className={styles.white}>todays</span><br/>
        <span className={styles.smaller}>HSR character</span>
      </h1>

      <p>
        Enter any character to get started.
      </p>

      <div className={styles.characterInputDiv}>
        <input id='search-char-input' className={styles.characterInput} onKeyUp={changeInputState}
        placeholder="Enter a characters name..."
        ></input>
        <img src="/gray-arrow.svg" />
      </div>

      {
        inputState.length > 0 &&
        (
          <div className={styles.characterCollection}>
            { 
              props.options.filter(
                option => option.attributes.name.toLowerCase().startsWith(inputState.toLowerCase())
              )
              .map((item, index) => {
              return (
                <div className={styles.characterOption}
                  key={item.id}
                  onClick={() => {
                    props.onSelect(item);
                    setInput('');
                    document.getElementById("search-char-input").value = '';
                  }}
                > 
                  <div className={styles.characterOptionDiv}>
                    <div className={styles.characterOptionPortrait}>
                      <img src={'https://strapi-4frq.onrender.com' + item.attributes.image_profile.data.attributes.url}/>
                    </div>
                    <div className={styles.characterOptionText}>
                      {item.attributes.name}
                    </div>
                  </div>
                </div>
              )}      
            )}
          </div>
        )
      }
    </div>
  )
}

export default CharacterSearch
