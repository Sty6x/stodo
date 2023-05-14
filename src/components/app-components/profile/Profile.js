import React, { useContext, useEffect, useRef, useState } from "react";
import profileStyle from "./profile.module.scss";
import { FirebaseContext } from "../../../App";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const Profile = () => {
	const [profileActionsActive, setProfileActionsActive] = useState(false);
	const { auth, db } = useContext(FirebaseContext);
	const currentUserNameRef = useRef({});

	async function getUserName() {
		try {
			const userDoc = doc(db, "users", auth.currentUser.uid);
			const getUserDoc = await getDoc(userDoc);
			currentUserNameRef.current = { ...getUserDoc.data() };
			console.log(currentUserNameRef.current);
		} catch (err) {
			console.log("no user");
			throw err;
		}
	}
	function handleProfileAction() {
		return profileActionsActive
			? setProfileActionsActive(false)
			: setProfileActionsActive(true);
	}

	onAuthStateChanged(auth, (user) => {
		if (user) {
			return getUserName();
		}
		return console.log("no user");
	});

	return (
		<div className={profileStyle.profile}>
			<button
				onClick={handleProfileAction}
				className={profileStyle.profileButton}
			>
				{/* {currentUserNameRef.current.name[0]} */}F
			</button>
			{profileActionsActive && (
				<div className={profileStyle.actions}>
					<span className={profileStyle.emailName}>
						<strong>{currentUserNameRef.current.name}</strong>
						{currentUserNameRef.current.email}
					</span>

					<button>Settings</button>
					<button>Themes?</button>
					<button
						onClick={(e) => {
							signOut(auth);
						}}
					>
						Sign Out
					</button>
					<button>Delete Account</button>
				</div>
			)}
		</div>
	);
};
