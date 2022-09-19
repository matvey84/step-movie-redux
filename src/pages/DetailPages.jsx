import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
 import { useParams } from "react-router-dom";
import SimilarResults from "../components/similarList/SimilarResults";
import { getFetchForDetailsInfo, getFavoriteMovieIdFromDetailsPage, getFavoriteMovieId } from "../redux/actionsTypes";
import { /*getSimilarResults,*/showAlert} from "../redux/actionsTypes";
import { Loader } from "../components/loader/Loader";

export default function DetailPages(){
  const dispatch = useDispatch()
  const detailsData = useSelector(state=>state.fetchRedusers.detailsData)
  const favoriteMovieArr = useSelector(state=>state.fetchRedusers.favoriteMovieArr)
  const similarResultsData = useSelector(state=>state.fetchRedusers.similarResultsData)
  const data = useSelector(state=>state.fetchRedusers.data)
  const [disable, setDisable] = useState()
  const {imdbID} = useParams()
  
  const sendFavorMovieIdFromDetailPage = (e,id)=>{
    setDisable(true)
    dispatch(getFavoriteMovieIdFromDetailsPage(detailsData))
    const favorite = data.Search.filter((item,i) => item.imdbID===detailsData.imdbID)
    dispatch(getFavoriteMovieId(...favorite))
    const text = 'This movie has already been added to the list of favorites!'
    favoriteMovieArr.some(item =>item.imdbID===e.target.id) && dispatch(showAlert(text))

  }

  //send imdbIDto Fetch
  useEffect( 	()=>{
    dispatch(getFetchForDetailsInfo(imdbID))
  },[imdbID, dispatch])

  useEffect(()=>{
    localStorage.setItem('SimilaryResult', JSON.stringify(similarResultsData))
   } ,[similarResultsData])
   
  
//upload data
  // useEffect(()=>{
  // 	dispatch(getSimilarResults(detailsData.Title))
  // },[detailsData.Title, dispatch])

  return(
  
  <div className =" details-container mb-3">
    <div className ="row g-0">
      <div className ="poster col-md-4">
        <img 
          src={detailsData.Poster} 
          className="img-fluid rounded-start poster" 
          alt={detailsData.Title}
          onError={(e) => (e.currentTarget.src = "https://previews.123rf.com/images/pe3check/pe3check1710/pe3check171000054/88673746-no-image-available-sign-internet-web-icon-to-indicate-the-absence-of-image-until-it-will-be-download.jpg")}
        />
        <button
        disabled={disable} 
        onClick={(e)=>sendFavorMovieIdFromDetailPage(e)}
        id={imdbID}
        className="btn favor btn-success">
          Add to favorite 
        </button>
      </div>
      <div className ="col-md-8 total-info">
        <div className ="tech-info">
          <h2 className ="details-title">{detailsData.Title}</h2>
          <span className="info year">Year:  {detailsData.Year}</span>
          <span className="info relisaed">Relisaed:  {detailsData.Relisaed}</span>
          <span className="info country">Country:  {detailsData.Country}</span>
          <span className="info director">Director:  {detailsData.Director}</span>
          <span className="info genre">Genre:  {detailsData.Genre}</span>
          <span className="info runtime">Runtime:  {detailsData.Runtime}</span>
          <span className="info actors">Actors:  {detailsData.Actors}</span>
          <span className="info boxoffice">BoxOffice:  {detailsData.BoxOffice}</span>
          <span className="info rating"><strong>IMDB:  {detailsData.imdbRating}</strong></span>
        </div>
      </div>
    </div>
    <div className="description">
          <span className="info plot">{detailsData.Plot}</span>
    </div>
    {similarResultsData.Search ? <SimilarResults similarResultsData={similarResultsData}/> : <Loader/>}
  </div>
  )
}
