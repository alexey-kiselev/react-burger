import React from "react"
import styles from "./nav-menu.module.css"

export default function NavMenu({ children }: { children: React.ReactNode }) {
  return <nav className={styles.nav_menu}>{children}</nav>
}
