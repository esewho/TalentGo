import React from "react"
import style from "./modal.module.css"

// Modal.jsx
const Modal = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null

	return (
		<div className={style.modal_overlay}>
			<div className={style.modal_content}>
				<button
					style={{ color: "black" }}
					className={style.modal_close}
					onClick={onClose}
				>
					✖
				</button>
				{children}
			</div>
		</div>
	)
}

export default Modal
