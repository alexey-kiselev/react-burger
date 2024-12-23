import { FC } from 'react'
import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils"
import styles from './nav-item.module.css'

export default function NavItem({ title, Icon, active }: { title: string, Icon: FC<TIconProps>, active: boolean }) {
  return (
    <div className={active ? `${styles.nav_item} ${styles.nav_item_active}` : styles.nav_item}>
      <Icon type={active ? "primary" : "secondary"} />
      <p className={styles.nav_item_title}>
        {title}
      </p>
    </div>
  )
}

NavItem.defaultProps = {
  active: false
}
