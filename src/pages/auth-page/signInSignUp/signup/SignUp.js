import React, { useContext, useEffect, useState } from "react";
import signFormStyles from "../../authpages.module.scss";
import signUpStyles from "./signup.module.scss";
import { AuthForm } from "../../../../components/auth-components/AuthForm";
import { AuthContent } from "../../../../components/auth-components/AuthContent";
import { FirebaseContext } from "../../../../App";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../../Auth";
import { Outlet } from "react-router-dom";

export const SignUp = () => {
	const { auth } = useContext(FirebaseContext);
	const [inputError, setInputError] = useState({
		isError: false,
		message: null,
	});

	const [passwordConfirmed, setPasswordConfirmed] = useState(null);
	const [userCredentials, setUserCredentials] = useState({
		email: "",
		password: "",
	}); // use this state for submiting
	const [onSuccess, setOnSuccess] = useState(null);
	const authContent = {
		isSigningIn: false,
		formComponent: (
			<AuthForm
				errorInput={inputError}
				buttonType={"Sign Up"}
				onSubmit={createNewUser}
			>
				<div>
					<label htmlFor="email">Email</label>
					<input
						onChange={(e) => {
							validateInput(e);
							handleInputChange(e);
						}}
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
						}}
						type={"password"}
						minLength={8}
						required
						id={"password"}
					/>
				</div>
				{/* <div> */}
				{/* 	<label htmlFor="conf-pass">Confirm Password</label> */}
				{/* 	<input */}
				{/*         disabled */}
				{/* 		onChange={(e) => { */}
				{/* 			handleInputChange(e); */}
				{/* 		}} */}
				{/* 		type={"password"} */}
				{/* 		required */}
				{/* 		id={"passwordConfirmation"} */}
				{/* 	/> */}
				{/* </div> */}
			</AuthForm>
		),
		leftContentButton: { method: "Sign in", path: "/auth/sign-in" },
	};

	function handleInputChange(e) {
		const input = e.target;
		setUserCredentials((prev) => {
			return { ...prev, [input.id]: input.value };
		});
		validateInput(e);
	}

	async function createNewUser(e) {
		e.preventDefault();
		try {
			const newACcount = await createUserWithEmailAndPassword(
				auth,
				userCredentials.email,
				userCredentials.password
			);
			const newUser = newACcount.user;
		} catch (err) {
			console.log("Unable to create user");
			throw err;
		}
	}

	// function checkPasswordConfirmation() {
	// 	const passArr = userForm.password.split("");
	// 	const passConfArr = userForm.passwordConfirmation.split("");
	// 	// check passwords only if both of them are not empty to avoid returning true even if the inputs are empty
	// 	if (userForm.password !== "" && userForm.passwordConfirmation !== "") {
	// 		if (
	// 			passArr.length > passConfArr.length ||
	// 			passConfArr.length > passArr.length
	// 		) {
	// 			console.log("password does not match");
	// 			return false;
	// 		}
	// 		for (let i = 0; i < passConfArr.length; i++) {
	// 			if (passArr[i] === passConfArr[i]) {
	// 				console.log({ pass: passArr[i], conf: passConfArr[i] });
	// 			} else {
	// 				console.log("password does not match");
	// 				return false;
	// 			}
	// 		}
	// 		// return true if password checking is complete === true
	// 		// would automatically return false if any of the elements doesnt match
	// 		console.log("password matches");
	// 		return true;
	// 	} else {
	// 		return null;
	// 	}
	// }

	// delaying state change of password confirmation
	function validateInput(e) {
		const input = e.target;
		if (!input.validity.valid) {
			return setInputError((prev) => {
				return { isError: true, message: showError(input) };
			});
		} else {
			return setInputError((prev) => {
				return { isError: false, message: null };
			});
		}
	}

	function showError(input) {
		const errors = {
			missingValue: "Please Enter Your Email and Password",
			email: "You Must Enter a Valid Email",
			password: "A User's Password should not be less than 8 characters",
		};
		if (input.validity.valueMissing) {
			return errors.missingValue;
		}
		if (input.validity.typeMismatch) {
			return errors.email;
		}
		if (input.validity.tooShort) {
			return errors.password;
		}
	}

	useEffect(() => {
		console.log(auth.currentUser);
	}, [auth.currentUser]);
	return (
		<main className={signFormStyles.page}>
			{auth.currentUser ? (
				<Outlet />
			) : (
				<AuthContent
					key={"signUpContent"}
					content={authContent}
					onSuccess={onSuccess}
				/>
			)}
		</main>
	);
};
