import React from "react";
import headerStyles from "./headerComponent.module.scss";
import { format } from "date-fns";

export const HeaderComponent = ({ pageName, isMainHeader = false }) => {
	return (
		<header className={`${headerStyles.headerContainer}`}>
			{/* this should be a component */}
			<div className={`${headerStyles.titleDateContainer}`}>
				<h1>{pageName}</h1>
				{isMainHeader && <p>{format(new Date(), "PP")}</p>}
			</div>
		</header>
	);
};
