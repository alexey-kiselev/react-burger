import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { useRef, useState } from "react"
import { NavLink, useOutlet } from "react-router-dom"
import { ROUTES } from "../../constants"
import { useAppDispatch, useAppSelector } from "../../services/hooks"
import { getUser, logout, updateUserInfo } from "../../services/user"
import styles from "./profile-page.module.css"

function ProfileEdit(): JSX.Element {
  const user = useAppSelector(getUser)
  const refButtonsLine = useRef<HTMLDivElement>(null)

  const [newName, setNewName] = useState<string>(user!.name)
  const [newEmail, setNewEmail] = useState<string>(user!.email)
  const [newPassword, setNewPassword] = useState<string>("")

  const dispatch = useAppDispatch()

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newInfo = {
      name: newName !== user!.name ? newName : user!.name,
      email: newEmail !== user!.email ? newEmail : user!.email,
      password: newPassword !== "" ? newPassword : "",
    }
    if (newInfo.name || newInfo.email || newInfo.password) {
      dispatch(updateUserInfo(newInfo))
    }
  }

  const onCancel = () => {
    setNewName(user!.name)
    setNewEmail(user!.email)
    setNewPassword("")
    refButtonsLine.current!.style.visibility = "hidden"
  }

  const showButtonsLine = () => {
    refButtonsLine.current!.style.visibility = "visible"
  }

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.field_name}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={(e) => {
            setNewName(e.target.value)
            showButtonsLine()
          }}
          value={newName}
          name="newName"
          icon="EditIcon"
        />
      </div>
      <div className={styles.field_email}>
        <Input
          type="email"
          placeholder="Логин (E-mail)"
          onChange={(e) => {
            setNewEmail(e.target.value)
            showButtonsLine()
          }}
          value={newEmail}
          name="newEmail"
          icon="EditIcon"
        />
      </div>
      <div className={styles.field_password}>
        <PasswordInput
          onChange={(e) => {
            setNewPassword(e.target.value)
            showButtonsLine()
          }}
          value={newPassword}
          name="newPassword"
          icon="EditIcon"
        />
      </div>
      <div ref={refButtonsLine} className={styles.buttons_line}>
        <Button htmlType="button" type="secondary" size="medium" onClick={onCancel}>
          Отмена
        </Button>
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </div>
    </form>
  )
}

export default function ProfilePage(): JSX.Element {
  const outlet = useOutlet()
  const dispatch = useAppDispatch()

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <div className={styles.menu}>
          <NavLink
            end
            to={ROUTES.PROFILE_PAGE}
            className={({ isActive }) => (isActive ? styles.menu_link_active : styles.menu_link)}
          >
            Профиль
          </NavLink>
          <NavLink
            to={ROUTES.ORDERS_PAGE}
            className={({ isActive }) => (isActive ? styles.menu_link_active : styles.menu_link)}
          >
            История заказок
          </NavLink>
          <a className={styles.menu_link} onClick={() => dispatch(logout())}>
            Выход
          </a>
          <p className={styles.description}>
            В этом разделе вы можете изменить <br />
            свои персональные данные
          </p>
        </div>
        <div className={styles.sub_content}>{outlet || <ProfileEdit />}</div>
      </div>
    </div>
  )
}
