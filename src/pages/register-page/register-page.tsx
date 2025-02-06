import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ROUTES } from "../../constants"
import api from "../../utils/api"
import styles from "./register-page.module.css"

const RegisterPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    api.auth.register({ email: email, password: password, name: name }).then(() => navigate(ROUTES.HOME_PAGE))
  }

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <h1 className={styles.header}>Регистрация</h1>
        <form onSubmit={onSubmit}>
          <div className={styles.field_name}>
            <Input
              placeholder="Имя"
              onChange={(e) => {
                setName(e.target.value)
              }}
              value={name}
              name="name"
            />
          </div>
          <div className={styles.field_email}>
            <Input
              type="email"
              placeholder="E-mail"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              value={email}
              name="email"
            />
          </div>
          <div className={styles.field_password}>
            <PasswordInput
              placeholder="Пароль"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              value={password}
              name="password"
            />
          </div>
          <div className={styles.button_submit}>
            <Button htmlType="submit" type="primary" size="medium">
              Зарегистрироваться
            </Button>
          </div>
        </form>
        <p>
          Уже зарегистрировались?{" "}
          <Link to={ROUTES.LOGIN_PAGE} className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
