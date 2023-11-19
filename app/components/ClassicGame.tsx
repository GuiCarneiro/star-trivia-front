'use client'

import React, { useState, useEffect } from 'react';
import * as strapiAPI from '../api/strapiAPI';
import CharacterSearch from './CharacterSearch';

function ClassicGame(){
  // 0 - Loading
  // 1 - Game Running
  // 2 - Game Ended

  const [gameState, setGameState] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [challenge, setChallenge] = useState({});
  const [guesses, setGuesses] = useState([]);
  const [player, setPlayer] = useState({});

  useEffect(() => {
    getGameData();
    loadGuessesData();
    loadPlayerData();
  }, []);

  async function getGameData(){
    let charactersResp = await strapiAPI.getCharacters();
    setCharacters(charactersResp.data);

    let challengeResp = await strapiAPI.getTodayChallenge();
    setChallenge(challengeResp.data[0]);
    setGameState(1);
  }

  function loadGuessesData(){
    const guessesData = localStorage.getItem("guessesInLocal");
    if (guessesData === null) return undefined;
    setGuesses(JSON.parse(guessesData));
  }

  function loadPlayerData(){
    const playerData = localStorage.getItem("playerInLocal");
    if(playerData !== null){
      setPlayer(JSON.parse(playerData));
    };

    checkGameCurrentData();
  }

  function checkGameCurrentData(){
    if(player.lastTimeClassicPlayed == null || player.lastTimeClassicPlayed == new Date().toJSON().slice(0, 10)){
      updateTimePlayed();
      return;
    }
    else{
      updateTimePlayed();
      clearGuesses();
    }
  }

  // Guesses Actions

  function selectCharacter(guess){
    let tempGuesses = [... guesses];
    tempGuesses.push(guess);
    setGuesses(tempGuesses);
    saveGuesses(tempGuesses);
  }

  function saveGuesses(data){
    const guessesToLocal = JSON.stringify(data);
    localStorage.setItem("guessesInLocal", guessesToLocal);
  }

  // Player Actions

  function savePlayer(data){
    const playerToLocal = JSON.stringify(data);
    localStorage.setItem("playerInLocal", playerToLocal);
  }

  function updateTimePlayed(){
    let tempPlayer = {... player};
    tempPlayer.lastTimeClassicPlayed = new Date().toJSON().slice(0, 10);
    setPlayer(tempPlayer);
    savePlayer(tempPlayer);
  }

  return (
    <div>
      {gameState == 1 &&
        <CharacterSearch 
          options={characters}
          onSelect={selectCharacter}
        />
      }      
    </div>
  )
}

export default ClassicGame
