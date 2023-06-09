import React from "react";
import authFormStyles from "./authFormStyles.module.scss";
import { AnimatePresence, motion } from "framer-motion";
export const AuthForm = ({
	isLoading,
	errorInput,
	onSubmit,
	children,
	buttonType,
}) => {
	return (
		<motion.form className={authFormStyles.form} onSubmit={onSubmit}>
			<AnimatePresence initial={false}>
				{errorInput.isError === true && (
					<motion.div
						initial={{ opacity: 0.5, x: -15 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.7, type: "spring" }}
						exit={{ opacity: 0, x: 15, transition: { duration: 0.2 } }}
						className={authFormStyles.errorMessage}
					>
						<p>*{errorInput.message}</p>
					</motion.div>
				)}
			</AnimatePresence>
			{children}
			<div className={`${authFormStyles.btnContainer}`}>
				<button
					type="submit"
					className={`${
						isLoading
							? authFormStyles.signInLoading
							: authFormStyles.signInNotLoading
					}`}
				>
					{isLoading ? (
						<motion.span
							initial={{ opacity: 0, y: -100 }}
							animate={{ opacity: 1, y: 0 }}
							className={authFormStyles.loader}
						></motion.span>
					) : (
						buttonType
					)}
				</button>
			</div>
		</motion.form>
	);
};
