import React, { useEffect, useState } from "react";
import { AuthContent } from "../../../components/auth-components/AuthContent";
import { AuthForm } from "../../../components/auth-components/AuthForm";
import signFormStyles from "../signInSignUp.module.scss";
import signInStyles from "./signin.module.scss";

export const SignIn = () => {
	const [userCredentials, setUserCredentials] = useState({
		email: "",
		password: "",
	});
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
						onChange={handleInputChange}
						type={"email"}
						required
						id={"email"}
					/>
				</div>
				<div>
					<label htmlFor="pass">Password</label>
					<input
						onChange={handleInputChange}
						type={"password"}
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

	function validateOnSubmit(e) {
		// console.log(input);
		// if(input.validity.valid){
		// }
		// showError(input);
	}

	function showError(input) {
		const error = {};
		if (input.validity.typeMismatch) {
			error.email = "invalid Email please enter your Email address";
		}
		if (input.validity.tooShort) {
			error.password =
				"Minimum length of password must be atleast 8 characters";
		}
		if (input.validity.valueMissing) {
			error.value = "Please enter your Email and Password";
		}
		console.log(error);
		setInputErrors((prev) => [error]);
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
