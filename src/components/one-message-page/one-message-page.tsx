import styles from "./one-message-page.module.css"

interface IOneMessagePageProps {
  children: React.ReactNode
}

export default function OneMessagePage({ children }: IOneMessagePageProps): JSX.Element {
  return <div className={styles.container}>{children}</div>
}
