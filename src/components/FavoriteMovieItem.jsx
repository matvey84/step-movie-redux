import React,{useEffect} from "react";
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useDispatch } from "react-redux";
import { getFavoriteMovieIdAfterDelete, getFavoriteMovieAfterRemoveDuplicateMovie } from "../redux/actionsTypes";


function  FavoriteMovieItem (props) {
	const favoriteMovieArr = useSelector(state=>state.fetchRedusers.favoriteMovieArr)
	const dispatch = useDispatch()

	const deleteMovieFromFavorite = ()=> {
		const favoritData = JSON.parse(localStorage.getItem('FavoriteMovie'))
		const favoriteMovieAfterDelete = favoritData.filter((item,i) => i!==props.id)
		dispatch(getFavoriteMovieIdAfterDelete(favoriteMovieAfterDelete))
	}

	useEffect(()=>{
		let filterArr=[]
	  favoriteMovieArr.filter(item =>!filterArr.some(el => el.imdbID===item.imdbID)&&filterArr.push(item))
		dispatch(getFavoriteMovieAfterRemoveDuplicateMovie(filterArr))
		localStorage.setItem('FavoriteMovie', JSON.stringify(filterArr))
},[dispatch, favoriteMovieArr])
	
	return(
		<div className="card" id={props.id} >
			<div className="card-body">
				<div className="card-body">
					<h5 className="card-title">{props.data[props.id].Title}</h5>
					<p className="card-text">{props.data[props.id].Year}</p>
				</div>
				<div className="card-poster">
					<img src={props.data[props.id].Poster} className="card-img-top" alt={props.data[props.id].Title}/>
				</div>
			</div>
			<div className="item-button-block">
			<Link to={`/search/detail/${props.data[props.id].imdbID}`}>
				<button className="btn btn-primary"> Details </button>
			</Link>
				<button 
				onClick={deleteMovieFromFavorite}
				className="btn favor btn-danger">
					<div className="fav-btn-decor">
						<span className="fav-btn-text">Delete from favor</span>
						<span className="heart"
						  style={{color:'green', fontSize:'3vh'}}>
							&#9825;
						</span>
					</div>
				</button>
			</div>
		</div>
		
			)
}
 export default FavoriteMovieItem