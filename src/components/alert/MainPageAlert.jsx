import React from "react";
import { useSelector } from "react-redux";

export const  MainPageAlert=()=>{
const error = useSelector(state => state.allAlertRedusers.mainPageAlert)

	return(
	<div className="alert alert-warning" role="alert">
	  <span className="alert-text">	{error} </span>
	</div>
	)
}