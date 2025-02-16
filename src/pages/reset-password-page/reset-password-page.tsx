import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ROUTES } from "../../constants"
import api from "../../utils/api"
import styles from "./reset-password-page.module.css"

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("")
  const [code, setCode] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.state?.from !== "forgot-password") {
      navigate(ROUTES.HOME_PAGE)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    api.password.reset({ password: newPassword, code }).then(() => {
      navigate(ROUTES.LOGIN_PAGE)
    })
  }

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <h1 className={styles.header}>Восстановление пароля</h1>
        <form onSubmit={onSubmit}>
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
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
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

export default ResetPasswordPage
