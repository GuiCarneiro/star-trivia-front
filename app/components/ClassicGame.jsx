'use client'

import React, { useState, useEffect } from 'react';
import * as strapiAPI from '../api/strapiAPI';
import CharacterSearch from './CharacterSearch';
import CharacterGuesses from './CharacterGuesses';
import WonCard from './WonCard';
import ShareWon from './ShareWon';
import PastChallenge from './PastChallenge';

function ClassicGame(){
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

    if(player.lastWinClassic == new Date().toJSON().slice(0, 10)){
      setGameState(2);
    }
  }, [player]);


  useEffect(() => {
    if(gameState != 0 && characters.length == 0){
      setGameState(0);
      return
    }

    if(gameState != 2 && player.lastWinClassic == new Date().toJSON().slice(0, 10)){
      setGameState(2);
      return
    }
  }, [gameState]);

  async function getGameData(){
    let charactersResp = await strapiAPI.getCharacters();
    setCharacters(charactersResp.data);

    let challengeResp = await strapiAPI.getTodayChallenge();
    setChallenge(challengeResp.data[0]);

    let pastChallengeResp = await strapiAPI.getYesterdayChallenge();
    setPastChallenge(pastChallengeResp.data[0]);
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
  }

  // Match Actions
  function checkWin(guess){
    if(guess.id == challenge.attributes.character_id){
      setTimeout(() => {
        let tempPlayer = {... player};
        tempPlayer.lastWinClassic = new Date().toJSON().slice(0, 10);

        setGameState(2);
        setPlayer(tempPlayer);
        savePlayer(tempPlayer);
      }, 750)
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
        (gameState == 2) && (
          <>
            <WonCard
              guesses={guesses}
            />

            <ShareWon            
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
