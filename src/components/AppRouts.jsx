import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
///import NotFoundPage from "../../pages/NotFoundPage";

import DetailPages from "../pages/DetailPages"
import SearchMovie from "../pages/SearchMovie";
import FavoriteMovie from "../pages/FavoriteMovie";
import NavBar from "./NavBar";


export const AppRoutes = ()=>{
return(
<Routes>
  <Route path='/' element={<NavBar/>}>
	  <Route index element={<MainPage/>}/>
		<Route path='/search/' element={<SearchMovie/>}/>
		<Route path='/favorite/' element={<FavoriteMovie/>}/> 
		<Route path='/search/detail/:imdbID' element={<DetailPages/>}/>
 	</Route>
</Routes>
 )
}