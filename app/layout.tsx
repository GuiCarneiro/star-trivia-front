/* Instruments */
import styles from './styles/layout.module.scss'

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={styles.backgroundHtml}>
        <section className={styles.container}>
          <main className={styles.main}>{props.children}</main>
        </section>
      </body>
    </html>
  )
}
