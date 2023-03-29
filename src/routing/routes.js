import { App } from "../pages/App";
import { Overdue } from "../pages/app/Overdue";
import { Project } from "../pages/app/Project";
import { Today } from "../pages/app/Today";
import { Upcoming } from "../pages/app/Upcoming";
import { Auth } from "../pages/Auth";
import { Index } from "../pages/Index";
import { SignIn } from "../pages/signInSignUp/SignIn";
import { SignUp } from "../pages/signInSignUp/SignUp";

export const ROUTES = [
	{
		path: "/",
		name: "index",
		element: <Index />,
	},
	{
		path: "/auth",
		name: "auth",
		element: <Auth />,
		subRoutes: [
			{
				path: "sign-in",
				name: "sign-in",
				element: <SignIn />,
			},
			{ path: "sign-up", name: "sign-up", element: <SignUp /> },
		],
	},
	{
		path: "/app",
		name: "app",
		element: <App />,
		subRoutes: [
			{ path: "today", name: "today", element: <Today /> },
			{ path: "upcoming", name: "upcoming", element: <Upcoming /> },
			{ path: "overdue", name: "overdue", element: <Overdue /> },
			{ path: ":projectID", name: "project", element: <Project /> },
		],
	},
];
