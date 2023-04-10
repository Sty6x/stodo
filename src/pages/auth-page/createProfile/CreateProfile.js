import React from "react";
import authpagesStyle from "../authpages.module.scss";
import profileCreateStyles from "./createProfile.module.scss";

export const CreateProfile = () => {
	return (
		<main className={authpagesStyle.page}>
			<h1>What Should We Call You?</h1>
			<div className={profileCreateStyles.inputContainer}>
				<label htmlFor="name">Name:</label>
				<input
					name="name"
					id="name"
					placeholder="Type in your display name"
				/>
			</div>
		</main>
	);
};
