import { useParams } from "react-router-dom"
import styles from "./order-info-page.module.css"

const OrderInfoPage = () => {
  const { id } = useParams()

  return <h1 className={styles.header}>Информация о заказе #{id}</h1>
}

export default OrderInfoPage
