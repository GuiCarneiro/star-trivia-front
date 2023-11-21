'use client'
import styles from '../styles/countdown.module.scss';
import React, { useState, useEffect } from 'react';

function Countdown(){
  const [clockHours, setHours] = useState(0);
  const [clockMinutes, setMinutes] = useState(0);
  const [clockSeconds, setSeconds] = useState(0);

  useEffect(() => {
    updateTime();
  }, []);

  useEffect(() => {
    setTimeout(updateTime, 1000);
  }, [clockSeconds]);

  function updateTime(){
    let now = new Date();
    let end = new Date();
    end.setDate(end.getDate() + 1);
    end.setUTCHours(0,0,1,0);

    var secondsUntilChange = (end.getTime() - now.getTime()) / 1000;

    var hours = Math.floor(secondsUntilChange / 3600);
    var minutes = Math.floor((secondsUntilChange - (hours * 3600)) / 60);
    var seconds = Math.floor(secondsUntilChange - (hours * 3600) - (minutes * 60));

    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  }

  function formatNum(num){
    return num.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
  }

  return (
    <div className={styles.countdown}>
      {formatNum(clockHours)}:{formatNum(clockMinutes)}:{formatNum(clockSeconds)}
    </div>
  )
}

export default Countdown;