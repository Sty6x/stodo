import React, { useContext } from "react";
import { FirebaseContext } from "../../../App";

export const Today = () => {
  const {auth} = useContext(FirebaseContext);
	return <div id="today-page" key='today-page'>
       <h1>Hello,{auth.currentUser.displayName}</h1> 
    </div>;
};
