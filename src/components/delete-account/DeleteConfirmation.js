import React from "react";
import deleteConfirmationStyle from "./deleteConfirmation.module.scss";
import { motion } from "framer-motion";

export const DeleteConfirmation = ({
	handleDelete,
	handleDeleteConfirmation,
}) => {
	return (
		<div className={deleteConfirmationStyle.container}>
			<motion.div
				initial={{ y: -150, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: 100 }}
				className={deleteConfirmationStyle.modal}
			>
				<h1>Are you Sure you want to delete your account?</h1>
				<div className={deleteConfirmationStyle.buttonContainer}>
					<button onClick={handleDelete}>Confirm</button>
					<button onClick={handleDeleteConfirmation}>Cancel</button>
				</div>
			</motion.div>
		</div>
	);
};
