import React from "react";
import authpagesStyle from "../authpages.module.scss";
import profileCreateStyles from "./createProfile.module.scss";

export const CreateProfile = () => {
	return (
		<main className={`${authpagesStyle.page} ${profileCreateStyles.page}`}>
			<section className={profileCreateStyles.content}>
				<h1>What Should We Call You?</h1>
				<div className={profileCreateStyles.inputContainer}>
					<label htmlFor="name">Enter Your Name:</label>
					<div className={profileCreateStyles.innerInputContainer}>
						<input name="name" id="name" />

						<button></button>
					</div>
				</div>
			</section>
		</main>
	);
};
