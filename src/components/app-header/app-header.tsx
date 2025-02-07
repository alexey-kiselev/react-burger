import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { NavLink } from "react-router-dom"
import { ROUTES } from "../../constants"
import { useAppSelector } from "../../services/hooks"
import { getUser } from "../../services/user"
import styles from "./app-header.module.css"
import NavItem from "./nav-item/nav-item"
import NavMenu from "./nav-menu/nav-menu"

export default function AppHeader() {
  const user = useAppSelector(getUser)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavMenu>
          <div>
            <NavLink to={ROUTES.HOME_PAGE}>
              {({ isActive }) => <NavItem title="Конструктор" Icon={BurgerIcon} active={isActive} />}
            </NavLink>
            <NavLink to={ROUTES.ORDERS_PAGE}>
              {({ isActive }) => <NavItem title="Лента заказов" Icon={ListIcon} active={isActive} />}
            </NavLink>
          </div>
          <NavLink to={ROUTES.HOME_PAGE}>
            <Logo />
          </NavLink>
          <NavLink to={ROUTES.PROFILE_PAGE}>
            {({ isActive }) => {
              if (user !== null) {
                return <NavItem title={user.name} Icon={ProfileIcon} active={isActive} />
              }
              return <NavItem title="Личный кабинет" Icon={ProfileIcon} active={isActive} />
            }}
          </NavLink>
        </NavMenu>
      </div>
    </header>
  )
}
