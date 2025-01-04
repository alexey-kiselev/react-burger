import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'
import NavItem from './nav-item/nav-item'
import NavMenu from './nav-menu/nav-menu'

function AppHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <NavMenu>
          <div>
            <NavItem title="Конструктор" Icon={BurgerIcon} active={true} />
            <NavItem title="Лента заказов" Icon={ListIcon} />
          </div>
          <Logo />
          <NavItem title="Личный кабинет" Icon={ProfileIcon} />
        </NavMenu>
      </div>
    </div>
  )
}

export default AppHeader
