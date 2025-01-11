import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { CallbackFunction } from "../modal"
import styles from "./modal-header.module.css"

export default function ModalHeader({ title = undefined, onClose }: { title?: string; onClose: CallbackFunction }) {
  const withTitle = typeof title !== "undefined" && title.trim() !== ""
  return (
    <div className={withTitle ? styles.modal_header_with_title : styles.modal_header_without_title}>
      <div className={styles.modal_header_title}>{title}</div>
      <CloseIcon className={styles.modal_header_close_icon} type="secondary" onClick={onClose} />
    </div>
  )
}
