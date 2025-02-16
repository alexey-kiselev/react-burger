import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ROUTES } from "../../constants"
import api from "../../utils/api"
import styles from "./forgot-password-page.module.css"

export default function ForgotPasswordPage(): JSX.Element {
  const [email, setEmail] = useState<string>("")
  const navigate = useNavigate()

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    api.password.forgot({ email }).then(() => {
      navigate(ROUTES.RESET_PASSWORD_PAGE, { state: { from: "forgot-password" } })
    })
  }

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <h1 className={styles.header}>Восстановление пароля</h1>
        <form onSubmit={onSubmit}>
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
            <Button htmlType="submit" type="primary" size="medium">
              Восстановить
            </Button>
          </div>
        </form>
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
