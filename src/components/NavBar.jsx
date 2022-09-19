import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {Link, Outlet,} from 'react-router-dom'
import {getQueryParams, toggleForm,} from "../redux/actionsTypes";
import { MainPageAlert } from "./alert/MainPageAlert";
import { showAlert } from "../redux/actionsTypes";

export default function NavBar (){
  const emptyInput = useSelector(state => state.allAlertRedusers.mainPageAlert)
  const filteredFavoriteMovieArr = useSelector(state=>state.fetchRedusers.filteredMovieArr)
  const favoriteMovieArr = useSelector(state=>state.fetchRedusers.favoriteMovieArr)
  const hide = useSelector(state=>state.fetchRedusers.hide)
  const [styleColor, setColor] = useState('')
  const [navInpValue, setNavInpValue] = useState('')
  const [favCount, setFavCount] = useState(filteredFavoriteMovieArr.length)
  
  const dispatch = useDispatch()
  

  const submitFetchReqwest = (e)=>{
    e.preventDefault()
    if(navInpValue===''||navInpValue===' '||null||navInpValue===undefined){// есть вопросы!!!!!!!!!!
      return 	dispatch(showAlert('Empty input field! Please, enter text!'))
    }
    if(navInpValue.trim()){
      const valueObj={}
    if (navInpValue.length) valueObj.title = navInpValue
    
      dispatch(getQueryParams(navInpValue))
      dispatch({type:'GET_VALUE_FROM_SEARCH_FORM', payload:valueObj})
      setNavInpValue('')
      dispatch(toggleForm(false))	
    }
  }

 const removeQueryValue=(e)=>{
  dispatch(toggleForm(true));
  dispatch({type:'UPDATE_CURRENT_PAGE_VALUE', payload:1})
    const valueObj={
      title:'',
      type:'',
      year:'',
      page: 1
    }
  dispatch({type:'GET_VALUE_FROM_SEARCH_FORM', payload:valueObj})
 }
 
  let classes=[]
  !hide ? classes.push('hide') : classes.splice('hide')
  
  let disable = true
  if(navInpValue.trim() && navInpValue.length > 0 && !null){
  disable = !disable
  }

  const randomColor = ()=>{
    let color =  Math.floor(Math.random()*16777215).toString(16)
    return color
}
  let styles=[]
  styles.splice(0,1,`${randomColor()}`)

  useEffect(()=>{setColor(randomColor())},[])
  useEffect(() => {
    favoriteMovieArr && setFavCount(favoriteMovieArr.length)
		filteredFavoriteMovieArr && setFavCount(filteredFavoriteMovieArr.length)
    console.log('effect')
	 },[favoriteMovieArr, filteredFavoriteMovieArr])

  return(
  <div className="header">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link  className="navbar-brand" to='/'>
          <b className="brand" 
            style={{color:`#${styleColor/*styles.join()*/}`}}
            onClick={removeQueryValue}>
              СHOOSE YOUR MOVIE
          </b>
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                <b onClick={removeQueryValue}>
                  HOME
                </b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">
                <b onClick={(e)=>{dispatch(toggleForm(false)); dispatch(showAlert(''))}} >
                  GO TO SEARCH MOVIE</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorite">
                <b onClick={(e)=>{dispatch(toggleForm(false)); dispatch(showAlert('')) }} > 
                  MY FAVORITE MOVIE 
                <sup style={{fontSize:'1.1rem', color:'green', marginLeft:'.5rem'}}>
                  {/* {!filteredFavoriteMovieArr.length ? null : filteredFavoriteMovieArr.length} */}
                  {favCount}
                </sup>
                </b>
              </Link>
            </li>
          </ul>
          <input 
            className={`${classes.join() } form-control`}
            value={navInpValue}
            type="text"
            placeholder="Search movie"
            aria-label="text"
            onChange={(e)=> setNavInpValue(e.target.value)}
          />
          <form onClick={submitFetchReqwest} className="d-flex">
            <button
              disabled = {disable}
              className={`${classes.join() } btn btn-success`}
            >
              <Link className="nav-link-search"
                disabled = {disable} to={`/search/`}>	
                  <p className="link-text"> 
                    Search
                  </p>
              </Link>
            </button>
          </form>
        </div>
      </div>
    </nav>
      {emptyInput && <MainPageAlert/>} 
      <Outlet />
    
  </div>
  )
}
