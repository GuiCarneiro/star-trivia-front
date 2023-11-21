'use client'

import React, { useState, useEffect } from 'react';
import * as strapiAPI from '../api/strapiAPI';
import CharacterSearch from './CharacterSearch';
import CharacterGuesses from './CharacterGuesses';
import WonCard from './WonCard';
import ShareWon from './ShareWon';
import PastChallenge from './PastChallenge';

function ClassicGame(props){
  // 0 - Loading
  // 1 - Game Running
  // 2 - Game Ended

  const [gameState, setGameState] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [challenge, setChallenge] = useState({});
  const [pastChallenge, setPastChallenge] = useState({});
  const [guesses, setGuesses] = useState([]);
  const [player, setPlayer] = useState({});

  useEffect(() => {
    getGameData();
    loadGuessesData();
    loadPlayerData();
  }, []);

  useEffect(() => {
    if(player.lastTimeClassicPlayed == null){
      updateTimePlayed();
    }

    if(player.lastTimeClassicPlayed != null && player.lastTimeClassicPlayed != new Date().toJSON().slice(0, 10)){
      updateTimePlayed();
      clearGuesses();
    }
  }, [player]);

  useEffect(() => {
    updateGameState();
  }, [player, guesses, characters, challenge, pastChallenge]);

  async function getGameData(){
    let charactersResp = await strapiAPI.getCharacters();
    setCharacters(charactersResp.data);

    let challengeResp = await strapiAPI.getTodayChallenge();
    setChallenge(challengeResp.data[0]);

    let pastChallengeResp = await strapiAPI.getYesterdayChallenge();
    setPastChallenge(pastChallengeResp.data[0]);
  }

  function updateGameState(){
    let baseState = 0;

    if(characters.length > 0 && challenge.id != null && pastChallenge.id != null){
      baseState = 1;
    }

    if(characters.length > 0 && challenge.id != null  && pastChallenge.id != null && player.lastWinClassic == new Date().toJSON().slice(0, 10)){
      baseState = 2;
    }

    if(baseState != gameState){
      setGameState(baseState);
    }
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
      window.postMessage({event: 'changeInPlayer', streak: playerData.streak});
    };
  }

  // Match Actions
  function checkWin(guess){
    if(guess.id == challenge.attributes.character_id){
      setTimeout(() => {
        let tempPlayer = {... player};
        tempPlayer.streak = checkForLastStreak();
        tempPlayer.lastWinClassic = new Date().toJSON().slice(0, 10);

        setPlayer(tempPlayer);
        savePlayer(tempPlayer);
      }, 750)
    }
  }

  function checkForLastStreak(){    
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if(player.lastWinClassic == yesterday.toJSON().slice(0, 10)){
      return (player.streak ? player.streak + 1 : 1)
    }
    else{
      return 1
    }
  }

  // Guesses Actions
  function selectCharacter(guess){
    let tempGuesses = [... guesses];
    tempGuesses.push(guess);
    setGuesses(tempGuesses);
    saveGuesses(tempGuesses);
    checkWin(guess);
  }

  function saveGuesses(data){
    const guessesToLocal = JSON.stringify(data);
    localStorage.setItem("guessesInLocal", guessesToLocal);
  }

  function clearGuesses(){
    const guessesToLocal = JSON.stringify([]);
    localStorage.setItem("guessesInLocal", guessesToLocal);
    setGuesses([]);
  }

  // Player Actions
  function savePlayer(data){
    const playerToLocal = JSON.stringify(data);
    window.postMessage({event: 'changeInPlayer', streak: data.streak});
    localStorage.setItem("playerInLocal", playerToLocal);
  }

  function updateTimePlayed(){
    const playerData = localStorage.getItem("playerInLocal");

    let tempPlayer = {... JSON.parse(playerData)};
    tempPlayer.lastTimeClassicPlayed = new Date().toJSON().slice(0, 10);
    setPlayer(tempPlayer);
    savePlayer(tempPlayer);
  }

  return (
    <div>
      {gameState == 1 &&
        (
          <>
            <CharacterSearch 
              options={
                characters.filter((c) => {
                  let pluckId = guesses.map(i => i.id);
                  return !pluckId.includes(c.id);
                }
              )}
              onSelect={selectCharacter}
            />            
          </>
        )
      }

      {
        (gameState == 2) &&
        (guesses.length > 0 && characters.length > 0 && challenge.id != null) &&
        (
          <>
            <WonCard
              answer={characters.filter(c => c.id == challenge.attributes.character_id)}
              guessesCount={guesses.length}
            />

            <ShareWon            
              answer={characters.filter(c => c.id == challenge.attributes.character_id)}
              guesses={guesses}
            />
          </>
        )
      }

      {(gameState == 1 || gameState == 2) &&
        (
          <>
            { 
              guesses.length > 0 && characters.length > 0 && challenge.id != null &&
              (
                <CharacterGuesses 
                  guesses={guesses}
                  answer={characters.filter(c => c.id == challenge.attributes.character_id)}
                  gameState={gameState}
                />
              )
            }            
          </>
        )        
      }

      {
        (gameState) == 1 && (
          <PastChallenge
            answer={characters.filter(c => c.id == pastChallenge.attributes.character_id)}
          />
        )
      }
    </div>
  )
}

export default ClassicGame
