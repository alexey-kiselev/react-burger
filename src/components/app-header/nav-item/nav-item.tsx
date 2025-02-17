import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils"
import { FC } from "react"
import styles from "./nav-item.module.css"

interface INavItemProps {
  title: string
  Icon: FC<TIconProps>
  active?: boolean
}

export default function NavItem({ title, Icon, active = false }: INavItemProps): JSX.Element {
  return (
    <div className={active ? `${styles.nav_item} ${styles.nav_item_active}` : styles.nav_item}>
      <Icon type={active ? "primary" : "secondary"} />
      <p className={styles.nav_item_title}>{title}</p>
    </div>
  )
}
