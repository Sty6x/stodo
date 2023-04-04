import React, { useState } from "react";
import { AuthContent } from "../../../components/auth-components/AuthContent";
import { AuthForm } from "../../../components/auth-components/AuthForm";
import signFormStyles from "../signInSignUp.module.scss";
import signInStyles from "./signin.module.scss";

function validateInputChange(e) {
	const input = e.target;
	console.log(input);
}
export const SignIn = () => {
	const [userCredentials, setUserCredentials] = useState({
		email: "",
		password: "",
	});
	const authContent = {
		isSigningIn: true,
		formComponent: (
			<AuthForm
				buttonType={"Sign in"}
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<div>
					<label htmlFor="email">Email</label>
					<input
						onChange={validateInputChange}
						type={"email"}
						required
						id={"email"}
					/>
				</div>
				<div>
					<label htmlFor="pass">Password</label>
					<input
						onChange={validateInputChange}
						type={"password"}
						required
						id={"pass"}
					/>
				</div>
			</AuthForm>
		),
		leftContentButton: { method: "Sign up", path: "/auth/sign-up" },
	};

	return (
		<main className={signFormStyles.signPage}>
			<AuthContent content={authContent} />
		</main>
	);
};
