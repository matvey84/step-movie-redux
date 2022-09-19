import React from 'react'
import{useSelector} from 'react-redux'


 function MainPage(){
	const data = useSelector(state=>state.fetchRedusers.movie)

	console.log(data)
	 return(
		<>
		
		</>
		

	 )
 }
 export default MainPage