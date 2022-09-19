import React, { useState} from "react";
import {nanoid} from 'nanoid';
import {useSelector} from 'react-redux'

function CreateButton (props){
	const data = useSelector(state=>state.fetchRedusers.data)
	const pages= useSelector(state=>state.paginatorReduser.pages)
	const[numBtn, setNumBtn] = useState(0)

	const sendPageValue = (e)=>{
  props.getFetchWithButtonPage(e.target.id)//fetch request
  }

	const numArr=[]
	for(let i=1; i<=pages; i++){
		numArr.push(i)
	}

	const buttonList = (			
			numArr.map((item, i) => (
				<button className='btn-page'
				  key={nanoid()}
					id={(i+1)+numBtn}
					onClick={sendPageValue}
					value={numBtn}
				>
					<span className="btn-page-text">
						{(i+1)+numBtn}
					</span>
				 </button> 
						
			  )
			)
		)

		
	return(
		<div className="btn-page-block">
		
			<button onClick={(e)=>setNumBtn(numBtn-data.Search.length)} id={'left-arrow'} className="btn-arrow left-arrow">
				<span className="btn-page-text">Back</span>
			</button>
			  	{buttonList}
			<button onClick={(e)=> setNumBtn(numBtn+data.Search.length)} id={'right-arrow'} className="btn-arrow right-arrow">
			  <span className="btn-page-text">Next</span>
			</button>
    </div>		
	)
}
export default CreateButton