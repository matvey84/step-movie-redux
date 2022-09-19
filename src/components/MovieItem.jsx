import React,{useEffect, useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFavoriteMovieId, 
	getFavoriteMovieAfterRemoveDuplicateMovie, showAlert,getSimilarResults } from "../redux/actionsTypes";


export const MovieItem=(props)=>{
	const {id} = props
	const data = useSelector(state=>state.fetchRedusers.data)
	const favoriteMovieArr = useSelector(state=>state.fetchRedusers.favoriteMovieArr)
	const [disable, setDisable] = useState()
	const dispatch = useDispatch()
	
	const sendFavorMovieId = (e,title) => {
	  const favorite = data.Search.filter((item,i) => i===id)
	  setDisable(true)
		disableButton(e)
		dispatch(getFavoriteMovieId(...favorite))	
	}

	const disableButton = (e)=>{//disabled button if Movie has in favoriteMovieArr
		const text = 'This movie has already been added to the list of favorites!'
		favoriteMovieArr.some(item =>item.imdbID===e.target.id)&&dispatch(showAlert(text))
	}

	useEffect(()=>{
		let filterArr=[]
		favoriteMovieArr.filter(item =>!filterArr.some(el => el.imdbID===item.imdbID)&&filterArr.push(item))
		dispatch(getFavoriteMovieAfterRemoveDuplicateMovie(filterArr))
		localStorage.setItem('FavoriteMovie', JSON.stringify(filterArr))
	},[dispatch, favoriteMovieArr])

	return(
		<div className="card" id={id}>
			<div className="card-body">
				<div className="title-block">
					<h5 className="card-title">{data.Search[id].Title}</h5>
					<p className="card-text">{data.Search[id].Year}</p>
				</div>
			
				<div className="card-poster">
				  <img src={data.Search[id].Poster}
					  className="card-img-top" 
					  alt={data.Search[id].Title}
					  onError={(e) => (e.currentTarget.src = "https://previews.123rf.com/images/pe3check/pe3check1710/pe3check171000054/88673746-no-image-available-sign-internet-web-icon-to-indicate-the-absence-of-image-until-it-will-be-download.jpg")}
					/>
				</div>
			</div>
			<div className="item-button-block">
			<Link to={`/search/detail/${data.Search[id].imdbID}`}>
				<button
				onClick={()=>dispatch(getSimilarResults(data.Search[id].Title))}
				 className="btn btn-primary"> Details </button>
			</Link>
				<button 
					id={data.Search[id].imdbID}
					onClick = {(e)=>sendFavorMovieId(e)}
					disabled={disable}
					className="btn favor btn-success">
						<div
							id={data.Search[id].imdbID}
							className="fav-btn-decor">
								<span className="fav-btn-text">Add to favor</span>
								<span className="heart">  &#9825;</span>
						</div>
				</button>
			</div>
		</div>
	)
}