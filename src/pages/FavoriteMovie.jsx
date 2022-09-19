import React, { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { Loader } from "../components/loader/Loader";
import FavoriteMovieItem from "../components/FavoriteMovieItem";
import {nanoid} from 'nanoid'

function FavoriteMovie (){
  const favoriteMovieArr = useSelector(state => state.fetchRedusers.favoriteMovieArr)
  const [data, setData] = useState(favoriteMovieArr)
  const loading =useSelector(state => state.loadReduser.loading)
  
  useEffect(()=>{
    const favoritData = JSON.parse(localStorage.getItem('FavoriteMovie'))
    setData(favoritData)
  },[favoriteMovieArr])
  console.log(data)
  return(
    <div className="favorite-page-container">
      <div className="title-text">
        <h2 className="favorite-movie-title">My favorite movies</h2>
      </div>
      <div className="favorite-result-list">
        {loading ?
          <Loader/> :
            data.length > 0 && data.map((info, i) => 
            <FavoriteMovieItem
              id={i}
              key={nanoid()} 
              data={data}
            />
        )}
      </div>
    </div>
  )
}

export default FavoriteMovie