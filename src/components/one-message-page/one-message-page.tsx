import styles from "./one-message-page.module.css"

export default function OneMessagePage({ children }: { children: React.ReactNode }) {
  return <div className={styles.container}>{children}</div>
}
