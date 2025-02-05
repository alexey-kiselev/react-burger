import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState } from "react"
import { NavLink, useOutlet } from "react-router-dom"
import { ROUTES } from "../../constants"
import { useAppDispatch } from "../../services/hooks"
import { logout } from "../../services/user"
import styles from "./profile-page.module.css"

const ProfileEdit = () => {
  const [newName, setNewName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")

  return (
    <>
      <div className={styles.field_name}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={(e) => setNewName(e.target.value)}
          value={newName}
          name="newName"
          icon="EditIcon"
        />
      </div>
      <div className={styles.field_email}>
        <Input
          type="email"
          placeholder="Логин (E-mail)"
          onChange={(e) => setNewEmail(e.target.value)}
          value={newEmail}
          name="newEmail"
          icon="EditIcon"
        />
      </div>
      <div className={styles.field_password}>
        <PasswordInput
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
          name="newPassword"
          icon="EditIcon"
        />
      </div>
      <div className={styles.button_line}>
        <Button htmlType="button" type="secondary" size="medium">
          Отмена
        </Button>
        <Button htmlType="button" type="primary" size="medium">
          Сохранить
        </Button>
      </div>
    </>
  )
}

const ProfilePage = () => {
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

export default ProfilePage
