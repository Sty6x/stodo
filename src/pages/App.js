import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const App = () => {
	return (
		<div>
			<Outlet />
		</div>
	);
};
