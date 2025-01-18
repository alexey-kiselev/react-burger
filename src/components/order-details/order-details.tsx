import image_order_is_submitted from "../../images/order_is_submitted.png"
import { useAppSelector } from "../../services/hooks"
import { selectLastOrderNumber } from "../../services/last-order/reducers"
import ModalOverlay from "../modal-overlay/modal-overlay"
import Modal, { CallbackFunction } from "../modal/modal"
import styles from "./order-details.module.css"

export default function OrderDetails({ onClose }: { onClose: CallbackFunction }) {
  const lastOrderNumber = useAppSelector(selectLastOrderNumber)

  return (
    <div className={styles.order_datails}>
      <Modal onClose={onClose}>
        <p className={styles.order_number}>{lastOrderNumber}</p>
        <p className={styles.text_order_number}>идентификатор заказа</p>
        <img className={styles.image_order_is_submitted} src={image_order_is_submitted} />
        <p className={styles.text_order_info_main}>Ваш заказ начали готовить</p>
        <p className={styles.text_order_info_additional}>Дождитесь готовности на орбитальной станции</p>
      </Modal>
      <ModalOverlay />
    </div>
  )
}
