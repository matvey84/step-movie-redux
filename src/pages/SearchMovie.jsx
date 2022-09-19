import React, {useEffect, useMemo} from "react";
import { useSelector } from "react-redux";
import SearchForm from '../components/SearchForm'
import {MovieItem} from '../components/MovieItem'
import {nanoid} from 'nanoid'
import {Loader} from '../components/loader/Loader'
import Paginator from "../components/paginator/Paginator";
import {useSearchParams} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { fetchMovie,} from "../redux/actionsTypes";


function SearchMovie (){
	const data = useSelector(state=>state.fetchRedusers.data)
	const hide = useSelector(state=>state.fetchRedusers.hide)
	const loading = useSelector(state=>state.loadReduser.loading)
	const queryParams = useSelector(state=>state.fetchRedusers.queryParams)
	const dispatch = useDispatch()
	const [searchParams,setSearchParams]=useSearchParams()
	const title = searchParams.get('title')
	const type = searchParams.get('type')
	const year = searchParams.get('year')
	const page = searchParams.get('page')|| 1


  useEffect(()=>{setSearchParams(queryParams)},[queryParams, setSearchParams])
  useMemo(()=>{
		dispatch(fetchMovie(title,type,year,page,))
	},[dispatch, page, title, type, year])

	return(
  <div className="search-page-container">
    <div className="search-result-list">
			{!hide && <SearchForm setSearchParams={setSearchParams}/>}
			
			{loading ?
				<Loader/> :
					data.Search && data.Search.map((info,i) => 
					<MovieItem
						id={i}
						key={nanoid()} 
						data={data}
		    />)
			}
		</div>
			{data.Search && <Paginator/>}	
  </div>
	)
}
export default SearchMovie