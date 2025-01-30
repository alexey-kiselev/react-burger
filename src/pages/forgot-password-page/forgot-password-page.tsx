import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState } from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "../../constants"
import styles from "./forgot-password-page.module.css"

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("")

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <h1 className={styles.header}>Восстановление пароля</h1>
        <div className={styles.field_email}>
          <Input
            type="email"
            placeholder="Укажите e-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
          />
        </div>
        <div className={styles.button_submit}>
          <Button htmlType="button" type="primary" size="medium">
            Восстановить
          </Button>
        </div>
        <p>
          Вспомнили пароль?{" "}
          <Link to={ROUTES.LOGIN_PAGE} className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
