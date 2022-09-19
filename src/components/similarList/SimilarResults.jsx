import React,{useState,useEffect}from "react";
import { Link,  } from "react-router-dom";
import { useSelector,} from "react-redux";
// import { Loader } from "../loader/Loader";
import {nanoid} from 'nanoid';
// import { getSimilarResults,} from "../redux/actionsTypes";

function SimilarResults ({similarResultsData}){
	//const similarResultsData = useSelector(state=>state.fetchRedusers.similarResultsData)
	const detailsData = useSelector(state=>state.fetchRedusers.detailsData)
	//const [fromStorage,setFromStorage]=useState(JSON.parse(localStorage.getItem('SimilaryResult')))
	const [filterredRes, setFilterredRes] = useState([])



	useEffect(() => {
	
		const filterredArr = similarResultsData.Search && similarResultsData.Search.filter(item=>item.imdbID !== detailsData.imdbID)	
		setFilterredRes(filterredArr)
		
	},[detailsData.imdbID, similarResultsData.Search])


	const list =(
		// similarResultsData.Search ?
    filterredRes.map((item,i)=>
			<Link
				to={`/search/detail/${filterredRes[i].imdbID}`} 
				className="list-group-item list-group-item-action active"
				aria-current="true"
				key={nanoid()}
				id ={i}
			>
        <span className="link-title">
					{`${filterredRes[i].Title} ${ filterredRes[i].Year}`}
				</span>
				
			</Link>
		 )
		//  :
		//  <Loader/>
		 
	)
 
	return(
	
	<div className="list-group">
	
			<h3>Simillary Results</h3>

	  {list}
	</div>
	)
}
export default SimilarResults


