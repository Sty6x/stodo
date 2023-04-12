import React, { useContext } from "react";
import { FirebaseContext } from "../../App";

export const Today = () => {
  const {auth} = useContext(FirebaseContext);
	return <>
       <h1>Hello,{auth.currentUser.displayName}</h1> 
    </>;
};
