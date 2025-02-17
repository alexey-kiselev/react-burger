import React from "react"
import styles from "./nav-menu.module.css"

interface INavMenuProps {
  children: React.ReactNode
}

export default function NavMenu({ children }: INavMenuProps): JSX.Element {
  return <nav className={styles.nav_menu}>{children}</nav>
}
