import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState } from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "../../constants"
import styles from "./register-page.module.css"

const RegisterPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <h1 className={styles.header}>Регистрация</h1>
        <div className={styles.field_name}>
          <Input placeholder="Имя" onChange={(e) => setName(e.target.value)} value={name} name="name" />
        </div>
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
          <Button htmlType="button" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </div>
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
