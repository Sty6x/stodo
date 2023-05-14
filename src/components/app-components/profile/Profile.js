import React, { useContext, useEffect, useRef, useState } from "react";
import profileStyle from "./profile.module.scss";
import { FirebaseContext } from "../../../App";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

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
	function handleProfileAction() {
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
			{profileActionsActive && (
				<div className={profileStyle.actions}>
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
				</div>
			)}
		</div>
	);
};
