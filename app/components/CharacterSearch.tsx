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
      <input id='search-char-input' className={styles.characterInput} onKeyUp={changeInputState}
        placeholder="Type a characters name..."
      ></input>

      {
        inputState.length > 0 &&
        (
          <div className={styles.characterCollection}>
            { 
              props.options.filter(
                option => option.attributes.name.toLowerCase().includes(inputState.toLowerCase())
              )
              .map((item, index) => {
              return (
                <div className={styles.characterOption}
                  key={index}
                  onClick={() => {
                    props.onSelect(item);
                    setInput('');
                    document.getElementById("search-char-input").value = '';
                  }}
                > 
                  <div className={styles.characterOptionDiv}>
                    <img src={'https://strapi-4frq.onrender.com' + item.attributes.image_profile.data.attributes.url}/>
                    <div>
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
