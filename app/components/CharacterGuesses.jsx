'use client'
import styles from '../styles/characterGuesses.module.scss';

function CharacterGuesses(props){
  return (
    <div className={styles.characterGuessColumn}>
      {
        props.gameState == 2 && (
          <h2>
            Your guesses
          </h2>
        )
      }
      

      { 
        props.guesses.toReversed().map((item, index) => (
          <div key={item.id} className={styles.characterGuessBlock}>            
            <div className={styles.characterGuessHeader}
              key={item.id + "-header"}
            >
              <div>
                {item.attributes.name}
              </div>

              <div>
                {item.attributes.path}
              </div>

              <div>
                {item.attributes.element}
              </div>

              <div>
                {item.attributes.origin}
              </div>
            </div>
            <div className={styles.guessItem}
              key={item.id + '-answer'}
            > 
              <div 
                className={styles.guessItemAnswerPortrait}
              >
                <img src={'https://strapi-4frq.onrender.com' + item.attributes.image_profile.data.attributes.url}/>
              </div>
              <div className={[styles.guessItemAnswer, styles.animated_path].join(" ")}
                data-green={item.attributes.path == props.answer[0].attributes.path ? 'true' : null}
                data-red={item.attributes.path != props.answer[0].attributes.path ? 'true' : null}
                key={item.id + "-path"}
              />
              <div 
                className={[styles.guessItemAnswer, styles.animated_element].join(" ")}
                data-green={item.attributes.element == props.answer[0].attributes.element ? 'true' : null}
                data-red={item.attributes.element != props.answer[0].attributes.element ? 'true' : null}

                key={item.id + "-element"}
              />
              <div 
                className={[styles.guessItemAnswer, styles.animated_origin].join(" ")}
                data-green={item.attributes.origin == props.answer[0].attributes.origin ? 'true' : null}
                data-red={item.attributes.origin != props.answer[0].attributes.origin ? 'true' : null}
                key={item.id + "-origin"}
              />
            </div>
          </div>
        )     
      )}
    </div>
  )
}

export default CharacterGuesses
