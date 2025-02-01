import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ROUTES } from "../../constants"
import api from "../../utils/api"
import styles from "./reset-password-page.module.css"

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("")
  const [code, setCode] = useState("")
  const navigate = useNavigate()

  const onSubmit = () => {
    api.password.reset(newPassword, "").then(() => {
      navigate(ROUTES.LOGIN_PAGE)
    })
  }

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <h1 className={styles.header}>Восстановление пароля</h1>
        <div className={styles.field_password}>
          <PasswordInput
            placeholder="Введите новый пароль"
            name="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className={styles.field_code}>
          <Input
            type="text"
            placeholder="Введите код из письма"
            onChange={(e) => setCode(e.target.value)}
            value={code}
            name="email"
          />
        </div>
        <div className={styles.button_submit}>
          <Button htmlType="button" type="primary" size="medium" onClick={onSubmit}>
            Сохранить
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

export default ResetPasswordPage
