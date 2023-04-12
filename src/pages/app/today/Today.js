import React, { useContext } from "react";
import { FirebaseContext } from "../../../App";
import todayStyles from './today.module.scss'
export const Today = () => {
  const {auth} = useContext(FirebaseContext);
	return <div id="today-page" key='today-page' className={todayStyles.todayPage}>
       <h1>Hello,{auth.currentUser.displayName}</h1> 
    </div>;
};
