'use client'
import styles from '../styles/pastChallenge.module.scss';

function PastChallenge(props){
  return (
    <div className={styles.pastGame}>
      <h2>Yesterday's Character</h2>
      <div className={styles.pastGameCharDiv}>
        <div className={styles.pastGameCharPortrait}>
          <img src={'https://strapi-4frq.onrender.com' + props.answer[0].attributes.image_profile.data.attributes.url}/>
        </div>
        <div className={styles.pastgameCharText}>
          {props.answer[0].attributes.name}
        </div>
      </div>
    </div>
  )
}

export default PastChallenge
