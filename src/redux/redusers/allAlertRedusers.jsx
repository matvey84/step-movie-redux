import { SHOW_MAIN_ALERT, HIDE_MAIN_ALERT, } from "../actionsTypes"

const defaultState = {
	mainPageAlert: '',
	
}

  export const allAlertRedusers = (state = defaultState, action)=>{
	
		switch(action.type){
			case SHOW_MAIN_ALERT:
				return {...state,	mainPageAlert: action.payload} 
			case HIDE_MAIN_ALERT:
				return {...state, mainPageAlert: ''}
			
			default:
				return state;
		}
  }