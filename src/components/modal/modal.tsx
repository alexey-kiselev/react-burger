import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import ModalHeader from "./modal-header/modal-header"
import styles from "./modal.module.css"

export type CallbackFunction = () => void

const modalRoot = document.getElementById("react-modals")!

export default function Modal({
  title = undefined,
  children,
  onClose,
}: {
  title?: string
  children: React.ReactNode
  onClose: CallbackFunction
}) {
  const eventKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", eventKeydown)
    return () => {
      document.removeEventListener("keydown", eventKeydown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ReactDOM.createPortal(
    <div
      className={styles.modal_wrapper}
      onClick={(event) => {
        if (event.currentTarget === event.target) {
          onClose()
        }
      }}
    >
      <div className={styles.modal}>
        <ModalHeader title={title} onClose={onClose} />
        <div className={styles.modal_content}>{children}</div>
      </div>
    </div>,
    modalRoot
  )
}
