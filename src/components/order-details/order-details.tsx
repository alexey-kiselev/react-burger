import image_order_is_submitted from "../../images/order_is_submitted.png"
import { useAppSelector } from "../../services/hooks"
import { selectLastOrderState } from "../../services/last-order"
import Loader from "../loader/loader"
import ModalOverlay from "../modal-overlay/modal-overlay"
import Modal, { CallbackFunction } from "../modal/modal"
import styles from "./order-details.module.css"

export default function OrderDetails({ onClose }: { onClose: CallbackFunction }) {
  const state = useAppSelector(selectLastOrderState)

  return (
    <div className={styles.order_datails}>
      <Modal onClose={onClose}>
        {state.loading ? (
          <Loader>
            <p className="text text_type_main-large">Оформляем заказ...</p>
          </Loader>
        ) : state.error ? (
          <p className={styles.text_order_info_main}>Что-то пошло не так :(</p>
        ) : (
          <>
            <p className={styles.order_number}>{state.order?.order.number}</p>
            <p className={styles.text_order_number}>идентификатор заказа</p>
            <img className={styles.image_order_is_submitted} src={image_order_is_submitted} alt="Успешный заказ" />
            <p className={styles.text_order_info_main}>Ваш заказ начали готовить</p>
            <p className={styles.text_order_info_additional}>Дождитесь готовности на орбитальной станции</p>
          </>
        )}
      </Modal>
      <ModalOverlay />
    </div>
  )
}
