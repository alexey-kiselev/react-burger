import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./app-header.module.css"
import NavItem from "./nav-item/nav-item"
import NavMenu from "./nav-menu/nav-menu"

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavMenu>
          <div>
            <a href="#" className={styles.link}>
              <NavItem title="Конструктор" Icon={BurgerIcon} active={true} />
            </a>
            <a href="#" className={styles.link}>
              <NavItem title="Лента заказов" Icon={ListIcon} />
            </a>
          </div>
          <a href="#" className={styles.link}>
            <Logo />
          </a>
          <a href="#" className={styles.link}>
            <NavItem title="Личный кабинет" Icon={ProfileIcon} />
          </a>
        </NavMenu>
      </div>
    </header>
  )
}
