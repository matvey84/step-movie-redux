import React, {useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import { fetchMovie } from "../redux/actionsTypes";
// import {Link} from 'react-router-dom'
// import{useNavigate} from 'react-router-dom'
function SearchForm(){
	const dispatch = useDispatch()
	const movieTitle = useSelector(state=>state.fetchRedusers.movieTitle)
	const[inpValue, setInpValue]=useState(movieTitle)
	const[inpYear, setInpYear]=useState('')
	const[inpType, setInpType]=useState('')

  function submitValueFromSearchForm(e){
		const valueObj={}
		if (inpValue.trim()) valueObj.title = inpValue 
		if (inpType.trim()) valueObj.type = inpType
		if (inpYear.trim()) valueObj.year = inpYear
		valueObj.page=1
		dispatch({type:'GET_VALUE_FROM_SEARCH_FORM', payload:valueObj})		
	}

	return(
	
		<div className="search-form-container container-fluid bg-light">
			<div className="search-form">
				<label className="movie-title" htmlFor="title"> Title: </label>
					<input value={inpValue} onChange={e=> setInpValue(e.target.value)}type="text" className="form-control inp title-inp" id="title" placeholder="movie title" />
						<select value={inpType} onChange={e=> setInpType(e.target.value)} className="form-select" >
							<option value = "">All...</option>
							<option value = "movie">Movie</option>
							<option value = "series">Series</option>
							<option value = "episode">Episode</option>
						</select>
					<label className="issue-inp" htmlFor="year"> Year: </label>
						<input value={inpYear} onChange={e=> setInpYear(e.target.value)}type="text" className="form-control inp issue-inp" id="year" placeholder="year of issue"
						/>
			</div>
			
				<button 
				  onClick={submitValueFromSearchForm}
				  type="submit"
				  id="form-btn"
					className="btn btn-primary search-form-btn">
						Search
				</button>
		</div>	
	)
}
export default SearchForm