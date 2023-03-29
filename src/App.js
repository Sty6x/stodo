import { Routes } from "react-router-dom";
import "./App.css";
import { RouterSwitch } from "./routing/RouterSwitch";
import { ROUTES } from "./routing/routes";

function App() {
	return (
		<div className="App">
			<RouterSwitch importRoutes={ROUTES} />
		</div>
	);
}

export default App;
