'use client'
import styles from '../styles/characterGuesses.module.scss';

function CharacterGuesses(props){
  return (
    <div className={styles.characterGuessColumn}>
      <div className={styles.characterGuessHeader}>
        <div>
          Character
        </div>

        <div>
          Path
        </div>

        <div>
          Element
        </div>

        <div>
          Origin
        </div>
      </div>

      { 
        props.guesses.toReversed().map((item, index) => (
          <div className={styles.guessItem}
            key={item.id}
          > 
            <div 
              className={styles.guessItemAnswer}
            >
              <img src={'https://strapi-4frq.onrender.com' + item.attributes.image_profile.data.attributes.url}/>
            </div>

            <div className={[styles.guessItemAnswer, styles.animated_path].join(" ")}
              data-green={item.attributes.path == props.answer[0].attributes.path ? 'true' : null}
              data-red={item.attributes.path != props.answer[0].attributes.path ? 'true' : null}
              key={item.id + "-path"}
            >
              {item.attributes.path}
            </div>

            <div 
              className={[styles.guessItemAnswer, styles.animated_element].join(" ")}
              data-green={item.attributes.element == props.answer[0].attributes.element ? 'true' : null}
              data-red={item.attributes.element != props.answer[0].attributes.element ? 'true' : null}

              key={item.id + "-element"}
            >
              {item.attributes.element}
            </div>

            <div 
              className={[styles.guessItemAnswer, styles.animated_origin].join(" ")}
              data-green={item.attributes.origin == props.answer[0].attributes.origin ? 'true' : null}
              data-red={item.attributes.origin != props.answer[0].attributes.origin ? 'true' : null}
              key={item.id + "-origin"}
            >
              {item.attributes.origin}
            </div>
          </div>
        )     
      )}
    </div>
  )
}

export default CharacterGuesses
