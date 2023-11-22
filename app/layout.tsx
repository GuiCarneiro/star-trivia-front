/* Instruments */
import styles from './styles/layout.module.scss'

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
