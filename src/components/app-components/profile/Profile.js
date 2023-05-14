import React, { useContext, useRef, useState } from "react";
import profileStyle from "./profile.module.scss";
import { FirebaseContext } from "../../../App";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

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

	onAuthStateChanged(auth, (user) => {
		if (user) {
			return getUserName();
		}
		return console.log("no user");
	});

	return (
		<button
			onClick={(e) => {
				setProfileActionsActive(true);
			}}
			className={profileStyle.profile}
		>
			{currentUserNameRef.current.name[0]}
		</button>
	);
};
