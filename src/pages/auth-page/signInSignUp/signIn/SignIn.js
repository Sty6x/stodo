import React, { useEffect, useRef, useState ,useContext} from "react";
import { AuthContent } from "../../../../components/auth-components/AuthContent";
import { AuthForm } from "../../../../components/auth-components/AuthForm";
import signInStyles from "./signin.module.scss";
import { FirebaseContext } from "../../../../App";
import { signInWithEmailAndPassword } from "firebase/auth";

export const SignIn = () => {
  const {auth,db} = useContext(FirebaseContext)
	const [userForm, setUserForm] = useState({
		email: "",
		password: "",
	});
	const [inputError, setInputError] = useState({
		isError: false,
		message: null,
	});
	const authContent = {
		isSigningIn: true,
		formComponent: (
			<AuthForm
				errorInput={inputError}
				buttonType={"Sign in"}
				onSubmit={signInUser}
			>
				<div>
					<label htmlFor="email">Email</label>
					<input
            name="email"
						onChange={(e) => {
							validateInput(e);
							handleInputChange(e);
						}}
						value={userForm.email}
						type={"email"}
						required
						id={"email"}
					/>
				</div>
				<div>
					<label htmlFor="pass">Password</label>
					<input
            name="password"
						onChange={(e) => {
							validateInput(e);
							handleInputChange(e);
						}}
						type={"password"}
						value={userForm.password}
						minLength={8}
						required
						id={"password"}
					/>
				</div>
			</AuthForm>
		),
		leftContentButton: { method: "Sign up", path: "/auth/sign-up" },
	};

	async function signInUser(e) {
		e.preventDefault();
    const form = new FormData(e.target)
    const user = Object.fromEntries(form.entries())
    try{
      const signIn = await signInWithEmailAndPassword(auth,user.email,user.password);
      console.log('Signed in')
    }catch(err){
      console.log("Email Doesn't exist")
      throw err
    }
	}

	function handleInputChange(e) {
		const input = e.target;
		setUserForm((prev) => ({ ...prev, [input.id]: input.value }));
	}

	function validateInput(e) {
		const input = e.target;
		if (!input.validity.valid) {
			setInputError((prev) => ({
				isError: true,
				message: showError(input),
			}));
		} else {
			setInputError({ isError: false, message: null });
		}
	}

	function showError(input) {
		const errors = {
			missingValue: "Please Enter Your Email and Password",
			email: "You Must Enter an Email",
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

	return (
			<AuthContent key={"signInContent"} content={authContent} />
	);
};
