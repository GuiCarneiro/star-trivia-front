'use client'

import React, { useState, useEffect } from 'react';
import * as strapiAPI from '../api/strapiAPI';
import CharacterSearch from './CharacterSearch';
import CharacterGuesses from './CharacterGuesses';
import WonCard from './WonCard';
import ShareWon from './ShareWon';
import PastChallenge from './PastChallenge';
import HowToPlay from './HowToPlay';
import StreakModal from './StreakModal';
import Lottie from 'react-lottie';
import * as loadingData from '../animations/loading.json';
import * as confettiData from '../animations/confetti.json';
import styles from '../styles/classicGame.module.scss';
import ReactGA from 'react-ga';
import amplitude from 'amplitude-js';

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
  const [showConfetti, setShowConfetti] = useState(false);
  var amplitudeInstance = amplitude.getInstance().init('96bc3a35921a2e1d2d4adc893e7a5217');


  useEffect(() => {
    getGameData();
    loadSavedData();
    loadGoogleAnalytics();
    amplitude.getInstance().logEvent('user-access');
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

  function loadGoogleAnalytics(){
    ReactGA.initialize('G-BHZK09HXPZ');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

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

  function loadSavedData(){    
    const playerData = localStorage.getItem("playerInLocal");
    const guessesData = localStorage.getItem("guessesInLocal");

    if(playerData !== null && JSON.parse(playerData).lastTimeClassicPlayed != new Date().toJSON().slice(0, 10)){
      clearGuesses();
    }

    if(guessesData !== null){
      setGuesses(JSON.parse(guessesData));
    }

    if(playerData !== null){
      setPlayer(JSON.parse(playerData));
      window.postMessage({event: 'changeInPlayer', streak: playerData.streak});
    };
  }

  // Match Actions
  function checkWin(guess){
    if(guess.id == challenge.attributes.character_id){
      setTimeout(() => {

        // Adding victories data to temporary player
        let tempPlayer = {... player};
        tempPlayer.streak = checkForLastStreak();
        tempPlayer.lastWinClassic = new Date().toJSON().slice(0, 10);

        // Send Data to Amplitude
        amplitude.getInstance().logEvent('user-won');

        // Updating player's data
        setPlayer(tempPlayer);
        savePlayer(tempPlayer);

        // Showing confetti for 3 seconds
        setShowConfetti(true);
        setTimeout(() => {setShowConfetti(false)}, 3000);
        
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
    amplitude.getInstance().logEvent('user-guessed');
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

      {gameState == 0 && 
        (
          <div className={styles.loadingBox}>
            <Lottie options={{
                loop: true,
                autoplay: true,               
                animationData: loadingData,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice'
                }
              }}
              height={224}
              width={224}
            />
          </div>
        )
      }

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

      { 
        showConfetti && (
          <div className={styles.confettiBox}>
            <Lottie options={{
                loop: true,
                autoplay: true,               
                animationData: confettiData,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice'
                }
              }}
            />
          </div>
        )
      }

      <HowToPlay />
      <StreakModal />
    </div>
  )
}

export default ClassicGame
