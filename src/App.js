import { Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { RouterSwitch } from "./routing/RouterSwitch";
import { ROUTES } from "./routing/routes";
import { React, createContext } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { getAuth, deleteUser, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDQD7TWt0E-m5zsMFTLfxbN-_uwUhw4saE",
	authDomain: "stodo-f3ce7.firebaseapp.com",
	projectId: "stodo-f3ce7",
	storageBucket: "stodo-f3ce7.appspot.com",
	messagingSenderId: "270403343540",
	appId: "1:270403343540:web:ee854a268fe1fda14d73e1",
	measurementId: "G-YS12MGWVZ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const FirebaseContext = createContext();
const db = getFirestore(app);
const auth = getAuth(app);
function App() {
	const navigate = useNavigate();

	return (
		<div className="App">
			<button
				onClick={async (e) => {
          signOut(auth)
				}}
				style={{ position: "absolute", left: "80%" }}
			>
				sign out
			</button>
			<FirebaseContext.Provider value={{ navigate, db, auth }}>
				<RouterSwitch importRoutes={ROUTES} />
			</FirebaseContext.Provider>
		</div>
	);
}

export default App;
