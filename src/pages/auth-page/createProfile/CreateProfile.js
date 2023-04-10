import React from "react";
import authpagesStyle from "../authpages.module.scss";
import profileCreateStyles from "./createProfile.module.scss";
import { AnimatePresence, motion } from "framer-motion";

export const CreateProfile = () => {
	return (
		<main className={`${authpagesStyle.page} ${profileCreateStyles.page}`}>
			<AnimatePresence>
				<motion.section
					initial={{ opacity: 0, y: -100 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ y: 100, opacity: 0 }}
					className={profileCreateStyles.content}
				>
					<motion.h1>What Should We Call You?</motion.h1>
					<div className={profileCreateStyles.inputContainer}>
						<label htmlFor="name">Enter Your Name:</label>
						<div className={profileCreateStyles.innerInputContainer}>
							<input name="name" id="name" />

							<motion.button
								whileHover={{ x: [null, 15, 10] }}
								transition={{ duration: 0.3, type: "spring" }}
							></motion.button>
						</div>
					</div>
				</motion.section>
			</AnimatePresence>
		</main>
	);
};
