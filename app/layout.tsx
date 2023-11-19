/* Components */
import { Nav } from './components/Nav'

/* Instruments */
import styles from './styles/layout.module.scss'
import './styles/globals.scss'

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html className={styles.backgroundHtml} lang="en">
      <body>
        <section className={styles.container}>
          <main className={styles.main}>{props.children}</main>
        </section>
      </body>
    </html>
  )
}
