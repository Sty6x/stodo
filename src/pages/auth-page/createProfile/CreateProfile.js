import React, { useContext, useEffect, useRef } from "react";
import authpagesStyle from "../authpages.module.scss";
import profileCreateStyles from "./createProfile.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { FirebaseContext } from "../../../App";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

export const CreateProfile = () => {
	const displayNameRef = useRef();
	const { auth, db } = useContext(FirebaseContext);
	const navigate = useNavigate();

	function handleInputChange(e) {
		const input = e.target;
		displayNameRef.current = input.value;
	}

	async function storeUserToDatabase(e) {
		e.preventDefault();
		try {
			const userCollection = doc(db, "users", auth.currentUser.uid);
			const setUser = await setDoc(userCollection, {
				name: displayNameRef.current,
				email: auth.currentUser.email,
			});
      await updateProfile(auth.currentUser,{displayName:displayNameRef.current})
			console.log(
				`successfully created new User ${auth.currentUser.displayName}`
			);
			navigate("/app/today");
		} catch (err) {
			console.log("failed to store user to database");
			throw err;
		}
	}

	return (
		<main className={`${authpagesStyle.page} ${profileCreateStyles.page}`}>
			<AnimatePresence>
				<motion.section
					initial={{ opacity: 0, y: -200 }}
					animate={{ opacity: 1, y: [null, 0] }}
					transition={{ duration: 0.6, type: "spring", damping: 10 }}
					exit={{ y: 100, opacity: 0 }}
					className={profileCreateStyles.content}
				>
					<motion.h1>What Should We Call You?</motion.h1>
					<div className={profileCreateStyles.inputContainer}>
						<label htmlFor="name">Enter Your Name:</label>
						<div className={profileCreateStyles.innerInputContainer}>
							<input
								ref={displayNameRef}
								onChange={handleInputChange}
								name="name"
								id="name"
							/>
							<motion.button
								onClick={storeUserToDatabase}
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
