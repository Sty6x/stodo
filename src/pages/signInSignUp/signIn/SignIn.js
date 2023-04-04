import React, { useEffect, useRef, useState } from "react";
import { AuthContent } from "../../../components/auth-components/AuthContent";
import { AuthForm } from "../../../components/auth-components/AuthForm";
import signFormStyles from "../signInSignUp.module.scss";
import signInStyles from "./signin.module.scss";

export const SignIn = () => {
	const [userForm, setUserForm] = useState({
		email: "",
		password: "",
	});
	const [userCredentials, setUserCredentials] = useState(userForm);
	const [inputErrors, setInputErrors] = useState([]);
	const authContent = {
		isSigningIn: true,
		formComponent: (
			<AuthForm
				buttonType={"Sign in"}
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				{inputErrors.length !== 0 && (
					<span>
						{inputErrors.map((err) => {
							return Object.values(err);
						})}
					</span>
				)}
				<div>
					<label htmlFor="email">Email</label>
					<input
						onChange={(e) => {
							handleInputChange(e);
							validateInput(e);
						}}
						value={userCredentials.email}
						type={"email"}
						required
						id={"email"}
					/>
				</div>
				<div>
					<label htmlFor="pass">Password</label>
					<input
						onChange={(e) => {
							handleInputChange(e);
							validateInput(e);
						}}
						type={"password"}
						value={userCredentials.password}
						required
						minLength={8}
						id={"password"}
					/>
				</div>
			</AuthForm>
		),
		leftContentButton: { method: "Sign up", path: "/auth/sign-up" },
	};

	function handleInputChange(e) {
		const input = e.target;
		setUserCredentials((prev) => ({ ...prev, [input.id]: input.value }));
	}

	function validateInput(e) {
		const input = e.target;
		showError(input);
	}

	function showError(input) {
		const error = {};
		if (!input.validity.valid) {
		} else {
		}
	}

	useEffect(() => {
		console.log(userCredentials);
	}, [userCredentials]);

	return (
		<main className={signFormStyles.signPage}>
			<AuthContent content={authContent} />
		</main>
	);
};
