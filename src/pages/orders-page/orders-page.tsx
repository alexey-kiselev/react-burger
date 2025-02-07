import { Link } from "react-router-dom"
import { ROUTES } from "../../constants"
import styles from "./orders-page.module.css"

const OrdersPage = () => {
  return (
    <>
      <h1 className={styles.header}>История заказов</h1>
      <ul>
        <li>
          <Link to={ROUTES.ORDER_BY_ID_PAGE.replace(":id", "101")} className={styles.order_link}>
            Заказ 101
          </Link>
        </li>
        <li>
          <Link to={ROUTES.ORDER_BY_ID_PAGE.replace(":id", "303")} className={styles.order_link}>
            Заказ 303
          </Link>
        </li>
      </ul>
    </>
  )
}

export default OrdersPage
