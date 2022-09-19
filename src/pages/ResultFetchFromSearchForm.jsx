import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import SearchForm from '../components/SearchForm'
import {MovieItem} from '../components/MovieItem'
import {nanoid} from 'nanoid'
import {Loader} from '../components/loader/Loader'
import Paginator from "../components/paginator/Paginator";
import {useParams} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { fetchMovie,} from "../redux/actionsTypes";


function ResultFetchFromSearchForm (){
	const data = useSelector(state=>state.fetchRedusers.data)
	const hide = useSelector(state=>state.fetchRedusers.hide)
	const loading =useSelector(state=>state.loadReduser.loading)
	const dispatch = useDispatch()

	const{title}= useParams()
	const{type}= useParams()
	const {year} = useParams()
	const {page} = useParams()
 
  useEffect(()=>{dispatch(fetchMovie(title,type,year,page))},[title,type,year,page,dispatch])
	

	const movieList=(
 	  data.Search && data.Search.map((info,i) => 
		  <MovieItem
			  id={i}
			  key={nanoid()} 
			  data={data}
		  />)
  )
	return(
  <div className="search-page-container">
	
    <div className="search-result-list">
			<div className=""></div>
		
				{!hide && <SearchForm/>}
				{loading ? <Loader/> : movieList}
		</div>
			{data.Search && <Paginator/>}	
  </div>
	)
}
export default ResultFetchFromSearchForm