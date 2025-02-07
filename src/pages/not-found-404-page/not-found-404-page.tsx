import { Link } from "react-router-dom"
import { ROUTES } from "../../constants"
import styles from "./not-found-404-page.module.css"

const NotFound404Page = () => {
  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <h1>А такой страницы нет :(</h1>
        <Link to={ROUTES.HOME_PAGE} className={styles.link}>
          Перейти на главную
        </Link>
      </div>
    </div>
  )
}

export default NotFound404Page
