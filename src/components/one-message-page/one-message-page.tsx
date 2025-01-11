import styles from "./one-message-page.module.css"

export default function OneMessagePage({ message }: { message: string }) {
  return (
    <div className={styles.container}>
      <p className={styles.message}>{message}</p>
    </div>
  )
}
