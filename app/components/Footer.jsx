'use client'
import styles from '../styles/footer.module.scss';

function Footer(){
  return (
    <div className={styles.footerDiv}>
      <div className={styles.footerHeader}>
        <div className={styles.footerSides}/>
        <div className={styles.footerCenter}>
          Check Us Out
        </div>
        <div className={styles.footerSides}/>
      </div>
      <div className={styles.footerLinks}>
        <a href="https://www.reddit.com/user/Mthread" target="_blank">
          <img src="/reddit.svg"/>
        </a>

        <a href="https://www.youtube.com/channel/UC2A6bkom3TQav4JqvD6LKkw" target="_blank">
          <img src="/ytb.svg"/>
        </a>

        <a href="https://discord.gg/yDvZaCwgbU" target="_blank">
          <img src="/discord.svg"/>
        </a>
      </div>
    </div>
  )
}

export default Footer;