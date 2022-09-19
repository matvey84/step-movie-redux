import React, {useMemo,useState } from "react";
import {useSelector} from 'react-redux'
import { useDispatch } from "react-redux";
import {nanoid} from 'nanoid';
import {useLocation} from 'react-router-dom'

function Paginator() {

	const data = useSelector(state=>state.fetchRedusers.data)
	const queryParams=useSelector(state=>state.fetchRedusers.queryParams)
	const currentPage = useSelector(state=>state.fetchRedusers.currentPage)
	const[numIndex, setNumIndex] = useState(0)
	const totalResult = Number(data.totalResults)
	const maxLimitPages = Math.ceil(totalResult/data.Search.length)
	const dispatch = useDispatch()
	const location = useLocation()
	const {title,type,year,} = queryParams

	const queryString = require('query-string');
  const parsedQueryString = useMemo(()=>queryString.parse(location.search),[location.search, queryString])
	
	const sendPageValue = (e,num)=>{
		const valueObj={}
		if (!title||title!=='') valueObj.title = title || ''
		//
		if (!type||type!=='') valueObj.type = type || ''// есть вопросы!!!!!!!!!!
		if (!year||year!=='')valueObj.year = year || ''// есть вопросы!!!!!!!!!!
		if (e)valueObj.page = +e.target.id 		
		dispatch({type:'GET_VALUE_FROM_SEARCH_FORM', payload:valueObj})
		dispatch({type:'UPDATE_CURRENT_PAGE_VALUE', payload:+e.target.id})
	}

	const arr = []
	const totalAmountPagesArr=[]
	for(let i=1; i<=data.totalResults; i++){
	arr.push(i)
	}
	let totalAmountPages = Math.ceil(arr.length/100)
	for(let j=1;j<=totalAmountPages;j++){
			totalAmountPagesArr.push(arr.splice(0,10))
	}

	const remainder = (numIndex+1)*10-maxLimitPages
	if(numIndex+1===totalAmountPages){
		totalAmountPagesArr[numIndex].splice(0-remainder, remainder)
	}

 	const buttonList = (			
	totalAmountPagesArr[numIndex].map((item, i) => (
		
		item === +currentPage || parsedQueryString.page===item ?
		<button className= 'btn-page'
			key={nanoid()}
			id={item}
			disabled={true}
			 onClick={(e)=>sendPageValue(e, item)}
		>
			<span id={item} className="btn-page-text">
				{item}
			</span>
		 </button>
		 :
		 <button className= 'btn-page'
			key={nanoid()}
			id={item}
			 onClick={(e)=>sendPageValue(e, item)}
		>
			<span id={item} className="btn-page-text">
				{item}
			</span>
		 </button>
		)
	)
)


let hideLeft=['hide']
let hideRight=[]
if ((numIndex+1)<=1){
	hideLeft.slice(0,1)
}else{
	hideLeft.push('hide')
}
if((numIndex*10)>=maxLimitPages-data.Search.length){
	hideRight.push('hide')
} 
if(maxLimitPages<=numIndex*10){
	hideRight.push('hide')
}

  return (
  <div className=" paginator-wrapper">	
		<div className="paginator">
			<button onClick={(e)=>setNumIndex(numIndex - 1)} id={'left-arrow'} className={`${hideLeft.join()} btn-arrow  left-arrow `}>
				<span className={`btn-page-text aria-hidden={${true}`}>&larr;</span>
			</button>
			
				{buttonList}
				
			<button onClick={(e)=> setNumIndex(numIndex + 1)} id={'right-arrow'} className={`${hideRight.join()} btn-arrow  right-arrow `}>
				<span className="btn-page-text">&rarr;</span>
			</button>
		</div> 
	</div>
 );
}
export default Paginator
