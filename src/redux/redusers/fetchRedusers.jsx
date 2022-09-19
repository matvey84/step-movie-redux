import {
	FETCH_MOVIE_TITLE, DEL_MOVIE_TITLE,
	GET_DATA, GET_DETAILS_DATA,
	SHOW_HIDE_FORM, GET_FETCH_WITH_PAGINATOR_BUTTON,
  GET_VALUE_FROM_SEARCH_FORM, UPDATE_CURRENT_PAGE_VALUE,
	GET_LOCATION, GET_FAVORITE_MOVIE,
  GET_FAVORITE_MOVIE_AFTER_DELETE,
	GET_FAVORITE_MOVIE_AFTER_REMOVING_DUPLICATE_MOVIE,
	GET_FAVORITE_MOVIE_ID_FROM_DETAILLS_PAGE,
	GET_SIMILAR_RESULTS_FETCH_FROM_DETAILS} from '../actionsTypes'

const defaultState = {
	movieTitle: '',
	hide:true,
	data:[],
	detailsData:[],
	queryParams:[],
	currentPage: 1,
	locationStorage:[],
	favoriteMovieArr:[],
	filteredMovieArr:[],
	favMovieIdFromDetailPage:[],
	similarResultsData:[]
}

export const fetchRedusers = (state= defaultState, action)=>{
console.log(action.payload)
switch (action.type){
	case FETCH_MOVIE_TITLE:
		return{...state, movieTitle: action.payload}

	case DEL_MOVIE_TITLE:
		return {...state, movieTitle: '' }

	case GET_DATA:
		return {...state, data: action.payload}

  case GET_DETAILS_DATA:
		return {...state, detailsData:action.payload}

	case  SHOW_HIDE_FORM:// можно НЕ ИСПОЛЬзовать
		return {...state, hide: action.payload}

	case GET_FETCH_WITH_PAGINATOR_BUTTON:
		return{...state, data:action.payload}

	case GET_VALUE_FROM_SEARCH_FORM:
		return{...state, queryParams:action.payload}

  case UPDATE_CURRENT_PAGE_VALUE:
		return{...state, currentPage:action.payload}

  case GET_LOCATION:
		return{...state, locationStorage:[...state.locationStorage, action.payload]
		}
	case GET_FAVORITE_MOVIE:
		return{...state, favoriteMovieArr:[...state.favoriteMovieArr, action.payload]}

  case GET_FAVORITE_MOVIE_AFTER_DELETE:
		return {...state, favoriteMovieArr:[...action.payload]} 

	case GET_FAVORITE_MOVIE_AFTER_REMOVING_DUPLICATE_MOVIE:
    return {...state, filteredMovieArr:[...action.payload]}
		
		case GET_FAVORITE_MOVIE_ID_FROM_DETAILLS_PAGE:
			return {...state, favMovieIdFromDetailPage: action.payload}

    case GET_SIMILAR_RESULTS_FETCH_FROM_DETAILS:
			return {...state, similarResultsData: action.payload}

	default:
		return state;	
  }
}




