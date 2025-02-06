import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { useRef, useState } from "react"
import { NavLink, useOutlet } from "react-router-dom"
import { ROUTES } from "../../constants"
import { useAppDispatch, useAppSelector } from "../../services/hooks"
import { getUser, logout, updateUserInfo } from "../../services/user"
import styles from "./profile-page.module.css"

const ProfileEdit = () => {
  const user = useAppSelector(getUser)
  const refButtonsLine = useRef(null)

  const [newName, setNewName] = useState(user!.name)
  const [newEmail, setNewEmail] = useState(user!.email)
  const [newPassword, setNewPassword] = useState("")

  const dispatch = useAppDispatch()

  const onSubmit = () => {
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
    const buttonsLine: HTMLDivElement = refButtonsLine.current!
    buttonsLine.style.visibility = "hidden"
  }

  const showButtonsLine = () => {
    const buttonsLine: HTMLDivElement = refButtonsLine.current!
    buttonsLine.style.visibility = "visible"
  }

  return (
    <>
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
        <Button htmlType="button" type="primary" size="medium" onClick={onSubmit}>
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
