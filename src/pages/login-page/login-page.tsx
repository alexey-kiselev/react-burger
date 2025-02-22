import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState } from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "../../constants"
import { useAppDispatch } from "../../services/hooks"
import { login } from "../../services/user"
import styles from "./login-page.module.css"

export default function LoginPage(): JSX.Element {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const dispatch = useAppDispatch()

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    dispatch(login({ email: email, password: password }))
  }

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <h1 className={styles.header}>Вход</h1>
        <form onSubmit={onSubmit}>
          <div className={styles.field_email}>
            <Input
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
            />
          </div>
          <div className={styles.field_password}>
            <PasswordInput onChange={(e) => setPassword(e.target.value)} value={password} name="password" />
          </div>
          <div className={styles.button_submit}>
            <Button htmlType="submit" type="primary" size="medium">
              Войти
            </Button>
          </div>
        </form>
        <p>
          Вы – новый пользователь?{" "}
          <Link to={ROUTES.REGISTER_PAGE} className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p>
          Забыли пароль?{" "}
          <Link to={ROUTES.FORGOT_PASSWORD_PAGE} className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  )
}
