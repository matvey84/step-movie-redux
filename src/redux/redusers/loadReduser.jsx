  import { SHOW_LOADING, HIDE_LOADING } from "../actionsTypes"
	const defaulrState= {
		loading:false
	}
 
	export const loadReduser = (state=defaulrState, action)=>{
    switch(action.type){
			case SHOW_LOADING:
				return {...state, loading: true}
			case HIDE_LOADING:
				return {...state, loading: false}

			default:
				return state
	 }
	}
