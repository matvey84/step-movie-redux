import React from "react";
import {BrowserRouter} from 'react-router-dom';
import { AppRoutes } from "./components/AppRouts";



function App() {
  return (
		<div className='container'>
    <BrowserRouter>
		  <AppRoutes />
		</BrowserRouter>
		</div>

		
  )
}

export default App;
