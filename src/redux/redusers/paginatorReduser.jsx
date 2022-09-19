import {GET_NUMBERS_OF_PAGE,GET_ARR_WITH_ALL_PAGES} from '../actionsTypes'

const defaultState={
	pages: 0,
	totalPageArr:[],
	

}

export const paginatorReduser = (state=defaultState, action) =>{

switch(action.type){
	case GET_NUMBERS_OF_PAGE:
		return{...state, pages:action.payload}
case GET_ARR_WITH_ALL_PAGES:
	return {...state,	totalPageArr:[...action.payload] }

	default:
		return state
}

}