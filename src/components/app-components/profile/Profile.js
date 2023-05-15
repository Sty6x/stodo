import React, { useContext, useEffect, useRef, useState } from "react";
import profileStyle from "./profile.module.scss";
import { FirebaseContext } from "../../../App";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

export const Profile = () => {
	const [profileActionsActive, setProfileActionsActive] = useState(false);
	const { auth, db } = useContext(FirebaseContext);
	const [currentUser, setCurrentUser] = useState();

	async function getUserName() {
		try {
			const userDoc = doc(db, "users", auth.currentUser.uid);
			const getUserDoc = await getDoc(userDoc);
			setCurrentUser({ ...getUserDoc.data() });
		} catch (err) {
			console.log("no user");
			throw err;
		}
	}

	async function deleteAccount() {
		try {
			const userDoc = doc(db, "users", auth.currentUser.uid);
			const deleteDoc = await deleteDoc(userDoc);
		} catch (err) {
			console.log("unable to delete account");
			throw err;
		}
	}

	function handleProfileAction(e) {
		return profileActionsActive
			? setProfileActionsActive(false)
			: setProfileActionsActive(true);
	}

	useEffect(() => {
		getUserName();
	}, []);

	return (
		<div className={profileStyle.profile}>
			<button
				onClick={handleProfileAction}
				className={profileStyle.profileButton}
			>
				{currentUser && currentUser.name[0]}
			</button>
			<AnimatePresence>
				{profileActionsActive && (
					<motion.div
						initial={{ y: -30, opacity: 0 }}
						animate={{
							y: 0,
							opacity: 1,
						}}
						exit={{
							y: -20,
							opacity: 0,
							transition: { duration: 0.1 },
						}}
						className={profileStyle.actions}
					>
						<span className={profileStyle.emailName}>
							<div>
								<span>{currentUser.name && currentUser.name[0]}</span>
							</div>
							<div>
								<strong>{currentUser.name}</strong>
								<p>{currentUser.email}</p>
							</div>
						</span>

						<button className={profileStyle.settings}>Settings</button>
						<button className={profileStyle.themes}>Themes?</button>
						<button
							className={profileStyle.signout}
							onClick={(e) => {
								signOut(auth);
							}}
						>
							Sign Out
						</button>
						<button className={profileStyle.deleteAccount}>
							Delete Account
						</button>
						<button className={profileStyle.github}>Github</button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
