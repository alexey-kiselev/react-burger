import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import NavMenu from './nav-menu/nav-menu'
import NavItem from './nav-item/nav-item'
import styles from './app-header.module.css'

function AppHeader() {
  return (
    <div className={styles.header}>
      <NavMenu>
        <div>
          <NavItem title="Конструктор" Icon={BurgerIcon} active={true} />
          <NavItem title="Лента заказов" Icon={ListIcon} />
        </div>
        <Logo />
        <NavItem title="Личный кабинет" Icon={ProfileIcon} />
      </NavMenu>
    </div>
  )
}

export default AppHeader
