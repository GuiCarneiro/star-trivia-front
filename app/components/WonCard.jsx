'use client'
import styles from '../styles/wonCard.module.scss';
import Countdown from './Countdown';

function WonCard(props){
  return (
    <div className={styles.wonCard}>
      <h2>
        Great work! You’ve guessed right
      </h2>
      <div className={styles.gameRightGuess}>
        <div className={styles.gameCharPortrait}>
          <img src={'https://strapi-4frq.onrender.com' + props.answer[0].attributes.image_profile.data.attributes.url}/>
        </div>
        <div className={styles.gameCharText}>
          <h3>
            {props.answer[0].attributes.name}
          </h3>
          <p>
            {props.guessesCount} {props.guessesCount > 1 ? 'tries' : 'try'}
          </p>
        </div>
      </div>

      <div className={styles.countDownBlock}>
        <p>
          Next character in
        </p>
        <Countdown />
      </div>
    </div>
  )
}

export default WonCard;